'use client';

import { useEffect, useState } from 'react';
import { User, UserRoundPlus } from 'lucide-react';

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

  useEffect(() => {
    console.log(friendRequests);
  }, [friendRequests]);

  return (
    <>
      {friendRequests.length > 0 ? (
        friendRequests.map((request) => (
          <div
            className='flex gap-4 items-center justify-between w-full bg-blue-400/70 p-2 rounded-sm'
            key={request.senderID}
          >
            <div className='flex items-center gap-2'>
              <UserRoundPlus className='size-8 shrink-0' />
              <p className='font-semibold'>{request.senderEmail}</p>
            </div>
            <div className='flex items-center gap-2'></div>
          </div>
        ))
      ) : (
        <p>No incoming friend requests!</p>
      )}
    </>
  );
};

export default IncomingFriendRequests;
