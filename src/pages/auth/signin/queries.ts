import { auth } from '@/lib/fetch';
import { LoginInput, LoginResponse } from '@/types/auth';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAuthMutation = (
  options?: UseMutationOptions<LoginResponse, Error, LoginInput>
) => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (variables: LoginInput) => {
      return auth.login(variables);
    },
    ...options
  });
};
