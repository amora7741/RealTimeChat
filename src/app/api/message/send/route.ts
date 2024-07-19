import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { Message, messageSchema } from '@/lib/validation/message';

export async function POST(request: NextRequest) {
  try {
    const { text, chatID } = await request.json();

    const existingSession = await getServerSession(authOptions);

    if (!existingSession) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const [userID1, userID2] = chatID.split('--');

    if (
      existingSession.user.id !== userID1 &&
      existingSession.user.id !== userID2
    ) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const friendID = existingSession.user.id === userID1 ? userID2 : userID1;

    const friendList = (await fetchRedis(
      'smembers',
      `user:${existingSession.user.id}:friends`
    )) as string[];

    const isFriend = friendList.includes(friendID);

    if (!isFriend) {
      return NextResponse.json(
        { error: 'You are not authorized.' },
        { status: 401 }
      );
    }

    const timeStamp = Date.now();

    const messageData: Message = {
      id: nanoid(),
      senderID: existingSession.user.id,
      text,
      timeStamp,
    };

    const message = messageSchema.parse(messageData);

    await db.zadd(`chat:${chatID}:messages`, {
      score: timeStamp,
      member: JSON.stringify(message),
    });

    return NextResponse.json({ message: 'OK' }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 400 }
    );
  }
}
