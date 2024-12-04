import { enhance } from '@/lib/fetch';
import {
  CreateEnhanceInput,
  DeleteEnhanceInput,
  EnhanceMutationResponse,
  ListEnhanceResponse,
  UpdateEnhanceInput
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

export const useEditEnhance = (
  options?: UseMutationOptions<
    EnhanceMutationResponse,
    Error,
    UpdateEnhanceInput
  >
) => {
  return useMutation<EnhanceMutationResponse, Error, UpdateEnhanceInput>({
    mutationFn: async (variables: UpdateEnhanceInput) => {
      return enhance.update(variables);
    },
    ...options
  });
};

export const useDeleteEnhance = (
  options?: UseMutationOptions<
    EnhanceMutationResponse,
    Error,
    DeleteEnhanceInput
  >
) => {
  return useMutation<EnhanceMutationResponse, Error, DeleteEnhanceInput>({
    mutationFn: async (variables: DeleteEnhanceInput) => {
      return enhance.delete(variables);
    },
    ...options
  });
};
