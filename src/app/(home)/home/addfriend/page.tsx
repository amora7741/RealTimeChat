import AddFriendForm from '@/components/AddFriendForm';

const AddFriend = async () => {
  return (
    <main className='p-6 w-full'>
      <h1 className='text-4xl font-extrabold mb-8'>Add a Friend</h1>
      <AddFriendForm />
    </main>
  );
};

export default AddFriend;
