import { z } from 'zod';

export const messageSchema = z.object({
  id: z.string(),
  senderID: z.string(),
  text: z.string(),
  timeStamp: z.number(),
});

export const messageArraySchema = z.array(messageSchema);

export type Message = z.infer<typeof messageSchema>;
