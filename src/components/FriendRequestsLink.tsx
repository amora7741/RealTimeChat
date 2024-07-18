'use client';

import Link from 'next/link';
import { UsersRound } from 'lucide-react';
import { useState } from 'react';

const FriendRequestsLink = ({
  sessionID,
  initialPendingRequests,
}: {
  sessionID: string | undefined;
  initialPendingRequests: number;
}) => {
  const [pendingRequests, setPendingRequests] = useState<number>(
    initialPendingRequests
  );

  return (
    <Link href='/home/requests'>
      <div className='flex items-center p-2 rounded-lg hover:bg-white/10'>
        <UsersRound className='size-7 mr-2 shrink-0' />
        <p className='truncate font-semibold'>Friend Requests</p>
        {pendingRequests > 0 && (
          <div className='size-6 rounded-full bg-blue-400/70 flex items-center justify-center text-xs ml-2'>
            <p>{pendingRequests}</p>
          </div>
        )}
      </div>
    </Link>
  );
};

export default FriendRequestsLink;
