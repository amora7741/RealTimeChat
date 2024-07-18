'use client';

import { useState } from 'react';
import { UserRoundPlus } from 'lucide-react';
import LoadingButton from './LoadingButton';
import { X, Check } from 'lucide-react';

const IncomingFriendRequests = ({
  incomingFriendRequests,
  sessionID,
}: {
  incomingFriendRequests: IncomingFriendRequest[];
  sessionID: string;
}) => {
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  const [denyLoading, setDenyLoading] = useState(false);
  const [acceptLoading, setAcceptLoading] = useState(false);

  return (
    <>
      {friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div
            className='flex gap-4 items-center justify-between w-full bg-blue-400/70 p-4 rounded-sm'
            key={request.senderID}
          >
            <div className='flex items-center gap-2'>
              <UserRoundPlus className='size-8 shrink-0' />
              <p className='font-semibold'>{request.senderEmail}</p>
            </div>
            <div className='flex items-center gap-2'>
              <LoadingButton
                className='bg-green-400 hover:bg-green-500'
                loading={acceptLoading}
              >
                <Check />
              </LoadingButton>
              <LoadingButton
                className='bg-red-500 hover:bg-red-600'
                loading={denyLoading}
              >
                <X />
              </LoadingButton>
            </div>
          </div>
        ))
      ) : (
        <p>No incoming friend requests!</p>
      )}
    </>
  );
};

export default IncomingFriendRequests;
