import { auth } from '@/lib/fetch';
import { LoginInput, LoginResponse } from '@/types/auth';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useLogin = (
  options?: UseMutationOptions<LoginResponse, Error, LoginInput>
) => {
  return useMutation<LoginResponse, Error, LoginInput>({
    mutationFn: async (variables: LoginInput) => {
      return auth.login(variables);
    },
    ...options
  });
};

export const useLogout = (
  options?: UseMutationOptions<LoginResponse, Error>
) => {
  return useMutation<LoginResponse, Error>({
    mutationFn: async () => {
      return auth.logout();
    },
    ...options
  });
};
