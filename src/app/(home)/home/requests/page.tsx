import IncomingFriendRequests from '@/components/IncomingFriendRequests';
import { fetchRedis } from '@/helpers/redis';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { notFound } from 'next/navigation';

const RequestsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const incomingRequestIDs = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingRequests = await Promise.all(
    incomingRequestIDs.map(async (senderID) => {
      const sender = (await fetchRedis('get', `user:${senderID}`)) as string;

      const parsedSender = JSON.parse(sender) as User;

      return {
        senderID,
        senderEmail: parsedSender.email,
      };
    })
  );

  return (
    <main className='w-full'>
      <h1 className='text-4xl font-extrabold mb-8'>Incoming Friend Requests</h1>
      <div className='flex flex-col gap-y-4'>
        <IncomingFriendRequests
          incomingFriendRequests={incomingRequests}
          sessionID={session.user.id}
        />
      </div>
    </main>
  );
};

export default RequestsPage;
