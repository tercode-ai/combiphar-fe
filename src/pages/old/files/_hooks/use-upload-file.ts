import { file } from '@/lib/fetch';
import { FileUploadInput, FileUploadResponse } from '@/types/file';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useUploadFileMutation = (
  options?: UseMutationOptions<FileUploadResponse, Error, FileUploadInput>
) => {
  return useMutation<FileUploadResponse, Error, FileUploadInput>({
    mutationFn: async (variables: FileUploadInput) => {
      return file.upload(variables);
    },
    ...options
  });
};
