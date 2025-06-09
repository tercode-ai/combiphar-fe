import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { file } from '@/lib/fetch';
import { FileResetResponse } from '@/types/file';

export const useFileResetMutation = (
  options?: UseMutationOptions<FileResetResponse, Error>
) => {
  return useMutation<FileResetResponse, Error>({
    mutationFn: async () => {
      return file.reset();
    },
    ...options
  });
};
