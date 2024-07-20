'use client';

import { useEffect, useState } from 'react';
import { UserRoundPlus } from 'lucide-react';
import LoadingButton from './LoadingButton';
import { X, Check } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';
import { pusherClient } from '@/lib/pusher';
import { toPusherKey } from '@/lib/utils';

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

  const router = useRouter();

  const acceptRequest = async (senderID: string) => {
    try {
      setAcceptLoading(true);

      await axios.post('/api/friends/accept', { id: senderID });

      setFriendRequests((prev) =>
        prev.filter((request) => request.senderID !== senderID)
      );

      router.refresh();

      toast({
        variant: 'success',
        title: 'Friend request accepted!',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while accepting the request.',
      });
    } finally {
      setAcceptLoading(false);
    }
  };

  const denyRequest = async (senderID: string) => {
    try {
      setDenyLoading(true);

      await axios.post('/api/friends/deny', { id: senderID });

      setFriendRequests((prev) =>
        prev.filter((request) => request.senderID !== senderID)
      );

      router.refresh();

      toast({
        variant: 'success',
        title: 'Friend request successfully denied.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred while denying the request.',
      });
    } finally {
      setDenyLoading(false);
    }
  };

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionID}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderID,
      senderEmail,
    }: IncomingFriendRequest) => {
      setFriendRequests((prev) => [...prev, { senderID, senderEmail }]);
    };

    pusherClient.bind('incoming_friend_requests', friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionID}:incoming_friend_requests`)
      );

      pusherClient.unbind('incoming_friend_requests', friendRequestHandler);
    };
  }, [sessionID]);

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
                onClick={() => acceptRequest(request.senderID)}
              >
                <Check />
              </LoadingButton>
              <LoadingButton
                className='bg-red-500 hover:bg-red-600'
                loading={denyLoading}
                onClick={() => denyRequest(request.senderID)}
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
