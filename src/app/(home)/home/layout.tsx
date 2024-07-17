import { WavyBackground } from "@/components/ui/background-waves";
import { LucideIcon, UserRoundPlus, Users } from "lucide-react";
import Link from "next/link";
import { BsChatLeftHeartFill } from "react-icons/bs";

type SidebarOption = {
  id: number;
  name: string;
  href: string;
  Icon: LucideIcon;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/home/addfriend",
    Icon: UserRoundPlus
  },
  {
    id: 2,
    name: "Friend Requests",
    href: "/home/requests",
    Icon: Users
  }
]

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WavyBackground backgroundFill="white">
      <div className='w-screen h-screen lg:w-[90vw] lg:h-[90vh] overflow-auto flex bg-blue-300/70 text-white lg:rounded-xl backdrop-blur-xl'>
        <div className='h-full w-full overflow-y-auto max-w-xs flex flex-col gap-y-12 p-6 bg-blue-300/30 lg:rounded-tl-xl lg:rounded-bl-xl'>
          <Link className="w-fit" href='/home'>
            <BsChatLeftHeartFill className='size-12' />
          </Link>

          <nav className='flex flex-col flex-1'>
            <ul className='flex flex-col flex-1 gap-y-8'>
              <li>
                <p className="font-bold uppercase text-lg">Your Chats</p>
              </li>

              <li>
                <p className="font-bold uppercase text-lg mb-2">Social</p>
                <ul className='space-y-2'>
                  {sidebarOptions.map((option) => (
                    <li key={option.id}>
                      <Link href={option.href}>
                        <div className='flex items-center p-2 rounded-lg hover:bg-white/10'>
                          <option.Icon className='size-7 mr-2 shrink-0' />
                          <span className='truncate font-semibold'>{option.name}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              <li className="mt-auto">
                <p>Hello</p>
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
