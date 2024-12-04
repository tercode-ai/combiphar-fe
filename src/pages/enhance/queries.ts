import { enhance } from '@/lib/fetch';
import {
  CreateEnhanceInput,
  EnhanceMutationResponse,
  ListEnhanceResponse
} from '@/types/enhance';
import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query';

export const useGetEnhance = () => {
  return useQuery<ListEnhanceResponse>({
    queryKey: ['list_enhance'],
    queryFn: async () => enhance.list()
  });
};

export const useCreateEnhance = (
  options?: UseMutationOptions<
    EnhanceMutationResponse,
    Error,
    CreateEnhanceInput
  >
) => {
  return useMutation<EnhanceMutationResponse, Error, CreateEnhanceInput>({
    mutationFn: async (variables: CreateEnhanceInput) => {
      return enhance.create(variables);
    },
    ...options
  });
};
