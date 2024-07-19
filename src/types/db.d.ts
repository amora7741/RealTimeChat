type User = {
  name: string;
  email: string;
  image: string;
  id: string;
};

type Chat = {
  id: string;
  messages: Message[];
};

type Message = {
  id: string;
  senderID: string;
  receiverID: string;
  text: string;
  timeStamp: number;
};

type FriendRequest = {
  id: string;
  senderID: string;
  receiverID: string;
};
