import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

import { z, ZodError } from 'zod';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id: userID } = z.object({ id: z.string() }).parse(body);

    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    await db.srem(
      `user:${existingSession.user.id}:incoming_friend_requests`,
      userID
    );

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
