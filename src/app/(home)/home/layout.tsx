import { WavyBackground } from '@/components/ui/background-waves';
import { LucideIcon, UserRoundPlus } from 'lucide-react';
import Link from 'next/link';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import LogoutPopover from '@/components/LogoutPopover';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import FriendRequestsLink from '@/components/FriendRequestsLink';
import { fetchRedis } from '@/helpers/redis';
import { notFound } from 'next/navigation';
import { getFriendsByID } from '@/helpers/get-friends-by-id';
import SidebarChatList from '@/components/SidebarChatList';

type SidebarOption = {
  id: number;
  name: string;
  href: string;
  Icon: LucideIcon;
};

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Add Friend',
    href: '/home/addfriend',
    Icon: UserRoundPlus,
  },
];

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    notFound();
  }

  const friends = await getFriendsByID(session.user.id);

  const pendingRequestCount = (
    (await fetchRedis(
      'smembers',
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <WavyBackground backgroundFill='white'>
      <div className='w-screen h-screen lg:w-[90vw] lg:h-[90vh] overflow-auto flex bg-blue-300/70 text-white lg:rounded-xl backdrop-blur-xl safari-blur'>
        <div className='h-full w-full overflow-y-auto max-w-xs flex flex-col gap-y-12 p-6 bg-blue-300/30 lg:rounded-tl-xl lg:rounded-bl-xl'>
          <Link className='w-fit' href='/home'>
            <BsFillChatSquareHeartFill className='size-12' />
          </Link>

          <nav className='flex flex-col flex-1'>
            <ul className='flex flex-col flex-1 gap-y-8'>
              {friends.length > 0 && (
                <li>
                  <p className='font-bold uppercase text-lg'>Your Chats</p>
                  <SidebarChatList
                    sessionID={session.user.id}
                    friends={friends}
                  />
                </li>
              )}

              <li>
                <p className='font-bold uppercase text-lg mb-2'>Social</p>
                <ul className='space-y-2'>
                  {sidebarOptions.map((option) => (
                    <li key={option.id}>
                      <Link href={option.href}>
                        <div className='flex items-center p-2 rounded-lg hover:bg-white/10'>
                          <option.Icon className='size-7 mr-2 shrink-0' />
                          <p className='truncate font-semibold'>
                            {option.name}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <FriendRequestsLink
                      sessionID={session?.user.id}
                      initialPendingRequests={pendingRequestCount}
                    />
                  </li>
                </ul>
              </li>

              <li className='mt-auto'>
                <LogoutPopover
                  userImage={session?.user.image}
                  userName={session?.user.name}
                  userEmail={session?.user.email}
                />
              </li>
            </ul>
          </nav>
        </div>
        {children}
      </div>
    </WavyBackground>
  );
};

export default HomeLayout;
