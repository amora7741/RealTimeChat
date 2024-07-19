'use client';

import { Textarea } from '@/components/ui/textarea';
import LoadingButton from './LoadingButton';
import { useRef, useState } from 'react';
import { CornerRightUp } from 'lucide-react';
import { toast } from './ui/use-toast';
import axios from 'axios';

const ChatInput = ({
  chatPartnerName,
  chatID,
}: {
  chatPartnerName: string;
  chatID: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  const sendMessage = async () => {
    if (!message) return;
    setLoading(true);

    try {
      await axios.post('/api/message/send', { text: message, chatID });
      setMessage('');
      textAreaRef.current?.focus();
    } catch {
      toast({
        variant: 'destructive',
        title: 'An error occurred while sending the message. Try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex gap-4 items-center'>
      <Textarea
        disabled={loading}
        className='resize-none'
        placeholder={`Message ${chatPartnerName}...`}
        value={message}
        ref={textAreaRef}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <LoadingButton
        loading={loading}
        className='h-full bg-blue-500/70'
        onClick={sendMessage}
      >
        <CornerRightUp />
      </LoadingButton>
    </div>
  );
};

export default ChatInput;
