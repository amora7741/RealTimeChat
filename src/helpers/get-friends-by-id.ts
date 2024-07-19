import { fetchRedis } from './redis';

export const getFriendsByID = async (userID: string) => {
  const friendIDs = (await fetchRedis(
    'smembers',
    `user:${userID}:friends`
  )) as string[];

  const friends = await Promise.all(
    friendIDs.map(async (friendID) => {
      const friend = (await fetchRedis('get', `user:${friendID}`)) as string;

      const parsedFriend = JSON.parse(friend) as User;

      return parsedFriend;
    })
  );

  return friends;
};
