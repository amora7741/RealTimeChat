import { fetchRedis } from '@/helpers/redis';
import { authOptions } from '@/lib/auth';
import { messageArraySchema } from '@/lib/validation/message';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Messages from '@/components/Messages';
import ChatInput from '@/components/ChatInput';

async function getChatMessages(chatId: string) {
  try {
    const results: string[] = await fetchRedis(
      'zrange',
      `chat:${chatId}:messages`,
      0,
      -1
    );

    const dbMessages = results.map((message) => JSON.parse(message) as Message);

    const reversedDbMessages = dbMessages.reverse();

    const messages = messageArraySchema.parse(reversedDbMessages);

    return messages;
  } catch (error) {
    notFound();
  }
}

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
  const chatPartnerString = (await fetchRedis(
    'get',
    `user:${chatPartnerID}`
  )) as string;
  const chatPartner = JSON.parse(chatPartnerString) as User;
  const initialMessages = await getChatMessages(chatID);

  return (
    <main className='p-6 w-full'>
      <div className='grid grid-rows-[auto_1fr_auto] w-full h-full'>
        <div className='flex items-center gap-2 border-b border-b-white/50 p-4'>
          <div className='relative size-14 border rounded-full'>
            <Image
              fill
              referrerPolicy='no-referrer'
              className='rounded-full'
              src={chatPartner.image}
              alt={`${chatPartner.name} profile picture`}
            />
          </div>
          <div className='flex flex-col'>
            <p className='font-bold'>{chatPartner.name}</p>
            <p className='text-sm'>{chatPartner.email}</p>
          </div>
        </div>

        <Messages
          sessionID={session.user.id}
          initialMessages={initialMessages}
          sessionImg={session.user.image}
          chatPartner={chatPartner}
          chatID={chatID}
        />

        <ChatInput chatPartnerName={chatPartner.name} chatID={chatID} />
      </div>
    </main>
  );
};

export default Chat;
