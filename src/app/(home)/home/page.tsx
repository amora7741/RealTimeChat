import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Home = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <h1>Hello</h1>
      <h2>Home Page</h2>
      <pre>{JSON.stringify(session)}</pre>
    </>
  );
};

export default Home;
