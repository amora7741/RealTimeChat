const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <div className='h-screen w-full grid grid-cols-[auto_1fr]'>
        <div>Sidebar</div>
        {children}
      </div>
    </section>
  );
};

export default HomeLayout;
