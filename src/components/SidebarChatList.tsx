'use client';

import { chatLinkConstructor } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SidebarChatList = ({
  sessionID,
  friends,
}: {
  sessionID: string;
  friends: User[];
}) => {
  const [unseenMessages, setUnseenMessages] = useState<Message[]>([]);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (pathName.includes('chat')) {
      setUnseenMessages((prev) => {
        return prev.filter((message) => !pathName.includes(message.senderID));
      });
    }
  }, [pathName]);

  return (
    <ul role='list' className='max-h-96 overflow-y-auto'>
      {friends.sort().map((friend) => {
        const unseenMessageCount = unseenMessages.filter((message) => {
          return message.senderID === friend.id;
        }).length;

        return (
          <li key={friend.id}>
            <a href={`/home/chat/${chatLinkConstructor(sessionID, friend.id)}`}>
              <div className='flex items-center justify-between p-2 rounded-lg hover:bg-white/10'>
                <p className='truncate'>{friend.name}</p>
                {unseenMessageCount > 0 && (
                  <div className='size-6 rounded-full shrink-0 bg-blue-400/70 flex items-center justify-center text-xs ml-2'>
                    <p>{unseenMessageCount}</p>
                  </div>
                )}
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarChatList;
