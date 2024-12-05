import { intro } from '@/lib/fetch';
import { EnhanceMutationResponse } from '@/types/enhance';
import {
  CreateIntroInput,
  ListIntroResponse,
  UpdateIntroInput
} from '@/types/intro';
import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query';

export const useGetIntro = () => {
  return useQuery<ListIntroResponse>({
    queryKey: ['list_intro'],
    queryFn: async () => intro.get()
  });
};

export const useCreateIntro = (
  options?: UseMutationOptions<EnhanceMutationResponse, Error, CreateIntroInput>
) => {
  return useMutation<EnhanceMutationResponse, Error, CreateIntroInput>({
    mutationFn: async (variables: CreateIntroInput) => {
      return intro.create(variables);
    },
    ...options
  });
};

export const useUpdateIntro = (
  options?: UseMutationOptions<EnhanceMutationResponse, Error, UpdateIntroInput>
) => {
  return useMutation<EnhanceMutationResponse, Error, UpdateIntroInput>({
    mutationFn: async (variables: UpdateIntroInput) => {
      return intro.update(variables);
    },
    ...options
  });
};
