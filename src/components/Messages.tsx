'use client';

import { cn } from '@/lib/utils';
import { Message } from '@/lib/validation/message';
import { useRef, useState } from 'react';

const Messages = ({
  sessionID,
  initialMessages,
}: {
  sessionID: string;
  initialMessages: Message[];
}) => {
  const scrollDownRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  return (
    <div
      id='messages'
      className='flex flex-col-reverse gap-y-2 overflow-y-auto py-4'
    >
      <div ref={scrollDownRef} />

      {messages.map((message, index) => {
        const isCurrentUser = message.senderID === sessionID;

        const moreMessagesFromUser =
          messages[index - 1]?.senderID === messages[index].senderID;

        return (
          <div key={`${message.id}-${message.timeStamp}`}>
            <div
              className={cn('flex items-end', { 'justify-end': isCurrentUser })}
            >
              <div
                className={cn('flex flex-col space-y-2 max-w-xs', {
                  'order-1 items-end': isCurrentUser,
                  'order-2 items-start': !isCurrentUser,
                })}
              >
                <p
                  className={cn('p-4 rounded-sm', {
                    'bg-blue-500/70': isCurrentUser,
                    'bg-white/70 text-black': !isCurrentUser,
                    'rounded-br-none': !moreMessagesFromUser && isCurrentUser,
                    'rounded-bl-none': !moreMessagesFromUser && !isCurrentUser,
                  })}
                >
                  {message.text}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;
