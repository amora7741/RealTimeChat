'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from './LoadingButton';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import { useState } from 'react';

import { AddSchema } from '@/lib/validation/addfriend';

const AddFriendForm = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof AddSchema>>({
    resolver: zodResolver(AddSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof AddSchema>) => {
    try {
      setLoading(true);

      await axios.post('/api/friends/add', {
        email: data.email,
      });

      toast({
        variant: 'success',
        title: 'Friend request sent!',
        description: 'Wait for the user to accept your request! :)',
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.response?.data?.error || 'Something went wrong!',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'An unexpected error occurred.',
        });
      }
    } finally {
      setLoading(false);
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
              <FormLabel className='font-semibold text-lg'>
                Add friend by E-Mail
              </FormLabel>
              <div className='flex flex-col sm:flex-row gap-4'>
                <FormControl>
                  <Input
                    className='text-black'
                    placeholder='123@example.com'
                    {...field}
                  />
                </FormControl>
                <LoadingButton type='submit' loading={loading}>
                  Add
                </LoadingButton>
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
