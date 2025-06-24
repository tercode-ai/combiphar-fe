import { login } from '@/api/auth/api';
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['post-login-oidc'],
    mutationFn: login
  });
};
