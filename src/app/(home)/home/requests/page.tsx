import { fetchRedis } from '@/helpers/redis';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const RequestsPage = async () => {
  const session = await getServerSession();

  if (!session) {
    notFound();
  }

  const incomingRequestIDs = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingRequestEmails = await Promise.all(
    incomingRequestIDs.map(async (senderID) => {
      const sender = (await fetchRedis('get', `user:${senderID}`)) as User;

      return {
        senderID,
        senderEmail: sender.email,
      };
    })
  );

  return (
    <main className='p-6'>
      <h1 className='text-5xl font-extrabold mb-8'>Incoming Friend Requests</h1>
    </main>
  );
};

export default RequestsPage;
