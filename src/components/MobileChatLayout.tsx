'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  TransitionChild,
} from '@headlessui/react';
import { UserRoundPlus, X } from 'lucide-react';
import Link from 'next/link';
import { BsFillChatSquareHeartFill } from 'react-icons/bs';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { SidebarOption } from '@/types/sidebar';
import { Session } from 'next-auth';
import { usePathname } from 'next/navigation';
import SidebarChatList from './SidebarChatList';
import FriendRequestsLink from './FriendRequestsLink';
import LogoutPopover from './LogoutPopover';

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: 'Add Friend',
    href: '/home/addfriend',
    Icon: UserRoundPlus,
  },
];

const MobileChatLayout = ({
  friends,
  session,
  pendingRequestCount,
}: {
  friends: User[];
  session: Session;
  pendingRequestCount: number;
}) => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathName]);

  return (
    <div className='fixed bg-blue-500/70 border-b top-0 inset-x-0 py-2 px-4'>
      <div className='w-full flex justify-between items-center'>
        <Link href='/home'>
          <BsFillChatSquareHeartFill className='size-8' />
        </Link>

        <Button
          className='flex items-center gap-2'
          onClick={() => setOpen(true)}
        >
          Menu <Menu />
        </Button>
      </div>
      <Dialog open={open} onClose={setOpen} className='relative z-10'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0'
        />

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <DialogPanel
                transition
                className='pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700'
              >
                <TransitionChild>
                  <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4'>
                    <button
                      type='button'
                      onClick={() => setOpen(false)}
                      className='relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white'
                    >
                      <span className='absolute -inset-2.5' />
                      <span className='sr-only'>Close panel</span>
                      <X aria-hidden='true' className='h-6 w-6' />
                    </button>
                  </div>
                </TransitionChild>
                <div className='flex h-full flex-col overflow-y-scroll bg-blue-400/70 text-white py-6 shadow-xl'>
                  <div className='px-4 sm:px-6'>
                    <BsFillChatSquareHeartFill className='size-8' />
                  </div>
                  <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                    <nav className='flex flex-col flex-1 h-full'>
                      <ul className='flex flex-col flex-1 gap-y-8'>
                        {friends.length > 0 && (
                          <li>
                            <p className='font-bold uppercase text-lg'>
                              Your Chats
                            </p>
                            <SidebarChatList
                              sessionID={session.user.id}
                              friends={friends}
                            />
                          </li>
                        )}

                        <li>
                          <p className='font-bold uppercase text-lg mb-2'>
                            Social
                          </p>
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
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default MobileChatLayout;
