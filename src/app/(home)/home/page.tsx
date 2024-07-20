import { getFriendsByID } from '@/helpers/get-friends-by-id';
import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { chatLinkConstructor } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const friends = await getFriendsByID(session.user.id);

  const friendsWithLastMessage = await Promise.all(
    friends.map(async (friend) => {
      const [lastMessageString] = (await fetchRedis(
        'zrange',
        `chat:${chatLinkConstructor(session.user.id, friend.id)}:messages`,
        -1,
        -1
      )) as string[];

      const lastMessage = JSON.parse(lastMessageString) as Message;

      return {
        ...friend,
        lastMessage,
      };
    })
  );

  return (
    <main className='p-6 w-full'>
      <h1 className='text-4xl font-extrabold mb-8'>Recent Chats</h1>
      {friendsWithLastMessage.length > 0 ? (
        friendsWithLastMessage.map((friend) => (
          <Link
            key={friend.id}
            href={`/home/chat/${chatLinkConstructor(
              session.user.id,
              friend.id
            )}`}
            className='flex justify-between relative sm:flex sm:items-center p-4 rounded-sm bg-blue-400/30'
          >
            <div className='flex gap-2'>
              <div className='relative size-12'>
                <Image
                  referrerPolicy='no-referrer'
                  className='rounded-full'
                  alt={`${friend.name} profile picture`}
                  src={friend.image}
                  fill
                />
              </div>
              <div className='flex flex-col'>
                <p className='font-semibold'>{friend.name}</p>
                <p className='max-w-md truncate'>
                  {friend.lastMessage.senderID === session.user.id
                    ? 'You: '
                    : ''}
                  {friend.lastMessage.text}
                </p>
              </div>
            </div>
            <ChevronRight className='size-7' />
          </Link>
        ))
      ) : (
        <p>No recent chats!</p>
      )}
    </main>
  );
}
