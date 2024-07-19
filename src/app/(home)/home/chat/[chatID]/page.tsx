import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { messageArraySchema } from '@/lib/validation/message';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { useEffect } from 'react';

const getChatMessages = async (chatID: string) => {
  try {
    const fetchResult: string[] = await fetchRedis(
      'zrange',
      `chat:${chatID}:messages`,
      0,
      -1
    );

    const messagesResult = fetchResult.map(
      (message) => JSON.parse(message) as Message
    );

    const reversedMessagesResult = messagesResult.reverse();

    const messages = messageArraySchema.parse(reversedMessagesResult);

    return messages;
  } catch (error) {
    notFound();
  }
};

const Chat = async ({ params }: { params: { chatID: string } }) => {
  const { chatID } = params;

  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const { user } = session;

  const [userID1, userID2] = chatID.split('--');

  if (user.id !== userID1 && user.id !== userID2) {
    notFound();
  }

  const chatPartnerID = user.id === userID1 ? userID2 : userID1;
  const chatPartner = (await fetchRedis(
    'get',
    `user:${chatPartnerID}`
  )) as User;
  const initialMessages = await getChatMessages(chatID);

  return (
    <main className='p-6 w-full'>
      <h1>{params.chatID}</h1>
    </main>
  );
};

export default Chat;
