'use client';

import Link from 'next/link';
import { UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';
import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

const FriendRequestsLink = ({
  sessionID,
  initialPendingRequests,
}: {
  sessionID: string | undefined;
  initialPendingRequests: number;
}) => {
  const [pendingRequestCount, setPendingRequestCount] = useState<number>(
    initialPendingRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionID}:incoming_friend_requests`)
    );

    const friendRequestHandler = () => {
      setPendingRequestCount((prev) => prev + 1);
    };

    pusherClient.bind('incoming_friend_requests', friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionID}:incoming_friend_requests`)
      );

      pusherClient.unbind('incoming_friend_requests', friendRequestHandler);
    };
  }, []);

  return (
    <Link href='/home/requests'>
      <div className='flex items-center p-2 rounded-lg hover:bg-white/10'>
        <UsersRound className='size-7 mr-2 shrink-0' />
        <p className='truncate font-semibold'>Friend Requests</p>
        {pendingRequestCount > 0 && (
          <div className='size-6 rounded-full shrink-0 bg-blue-400/70 flex items-center justify-center text-xs ml-2'>
            <p>{pendingRequestCount}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FriendRequestsLink;
