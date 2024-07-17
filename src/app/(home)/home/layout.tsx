import { WavyBackground } from "@/components/ui/background-waves";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <WavyBackground backgroundFill="white">
      <div className='w-screen h-screen lg:w-[90vw] lg:h-[90vh] overflow-auto flex bg-blue-300/70 text-white lg:rounded-xl backdrop-blur-xl'>
        <div className="h-full w-full max-w-xs flex flex-col gap-y-5 bg-blue-300/80 p-6 rounded-tl-xl rounded-bl-xl">Sidebar</div>
        {children}
      </div>

    </WavyBackground>
  );
};

export default HomeLayout;
