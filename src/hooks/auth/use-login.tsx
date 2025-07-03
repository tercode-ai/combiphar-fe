import { login } from '@/api/auth/api';
import { SessionToken } from '@/lib/cookies';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['post-login-oidc'],
    mutationFn: login,
    onSuccess: (res) => {
      SessionToken.set({
        access_token: res.data.token
      });
      navigate('/new/chat', { replace: true });
    },
    onError: () => {}
  });
};
