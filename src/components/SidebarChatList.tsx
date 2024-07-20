'use client';

import { pusherClient } from '@/lib/pusher';
import { chatLinkConstructor, toPusherKey } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from './ui/use-toast';
import { ToastAction } from './ui/toast';

type ExtendedMessage = Message & {
  senderName: string;
};

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

  useEffect(() => {
    pusherClient.subscribe(toPusherKey(`user:${sessionID}:chats`));
    pusherClient.subscribe(toPusherKey(`user:${sessionID}:friends`));

    const chatHandler = (message: ExtendedMessage) => {
      const shouldNotifyUser =
        pathName !==
        `/home/chat/${chatLinkConstructor(sessionID, message.senderID)}`;

      if (!shouldNotifyUser) {
        return;
      }

      toast({
        title: `${message.senderName} sent a message`,
        description: `${message.text}`,
        action: (
          <ToastAction altText='Open message' asChild>
            <a
              href={`/home/chat/${chatLinkConstructor(
                sessionID,
                message.senderID
              )}`}
            >
              Buh
            </a>
          </ToastAction>
        ),
      });

      setUnseenMessages((prev) => [...prev, message]);
    };
    const friendHandler = () => {
      router.refresh();
    };

    pusherClient.bind('new_message', chatHandler);
    pusherClient.bind('new_friend', friendHandler);

    return () => {
      pusherClient.unsubscribe(toPusherKey(`user:${sessionID}:chats`));
      pusherClient.unsubscribe(toPusherKey(`user:${sessionID}:friends`));
    };
  }, [pathName, sessionID, router]);

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
