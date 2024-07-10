'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';

const FormSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email.' }),
});

const AddFriendForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await axios.post('/api/friends/add', {
        email: data.email,
      });

      toast({
        variant: 'success',
        title: 'Friend request sent!',
        description: 'Wait for the user to accept your request! :)',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong.',
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='max-w-md relative'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add friend by E-Mail</FormLabel>
              <div className='flex flex-col sm:flex-row gap-4'>
                <FormControl>
                  <Input placeholder='123@example.com' {...field} />
                </FormControl>
                <Button type='submit'>Add</Button>
              </div>

              <FormMessage className='absolute right-0' />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default AddFriendForm;
