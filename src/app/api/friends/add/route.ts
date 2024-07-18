import { AddSchema } from '@/lib/validation/addfriend';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { fetchRedis } from '@/helpers/redis';
import { db } from '@/lib/db';
import { ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email: userEmail } = AddSchema.parse({ email: body.email });

    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const userID = (await fetchRedis(
      'get',
      `user:email:${userEmail}`
    )) as string;

    if (!userID) {
      return NextResponse.json(
        { error: 'This user does not exist!' },
        { status: 400 }
      );
    }

    if (userID === existingSession.user.id) {
      return NextResponse.json(
        { error: 'You cannot add yourself!' },
        { status: 400 }
      );
    }

    const existingFriendRequest = (await fetchRedis(
      'sismember',
      `user:${userID}:incoming_friend_requests`,
      existingSession.user.id
    )) as 0 | 1;

    if (existingFriendRequest) {
      return NextResponse.json(
        { error: 'You have already sent a request to this user!' },
        { status: 400 }
      );
    }

    const existingFriend = (await fetchRedis(
      'sismember',
      `user:${existingSession.user.id}:friends`,
      userID
    )) as 0 | 1;

    if (existingFriend) {
      return NextResponse.json(
        { error: 'You are already friends with this user!' },
        { status: 400 }
      );
    }

    db.sadd(`user:${userID}:incoming_friend_requests`, existingSession.user.id);

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data.' },
        { status: 400 }
      );
    } else {
      return NextResponse.json(
        { error: 'Something went wrong.' },
        { status: 400 }
      );
    }
  }
}
