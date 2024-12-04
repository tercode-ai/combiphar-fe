/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useLogin } from './queries';
import { useSearchParams } from 'react-router-dom';
import { useRouter } from '@/routes/hooks';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/providers/auth-provider';

export default function SignInPage() {
  const { push } = useRouter();
  const { login } = useAuth();

  const [searchParams] = useSearchParams();

  const key = searchParams.get('key') ?? '';

  const { mutate } = useLogin({
    onSuccess: ({ message }) => {
      if (message === 'success') {
        login(key);
        push('/chat');
      } else {
        toast({
          title: 'Invalid credential'
        });
      }
    }
  });

  React.useEffect(() => {
    if (key === '') {
      push('/404');
      return;
    }
    mutate({
      key
    });
  }, []);

  return null;
}
