import { file } from '@/lib/fetch';
import {
  FileListResponse,
  FileResetResponse,
  FileUploadInput,
  FileUploadResponse
} from '@/types/file';
import {
  useMutation,
  UseMutationOptions,
  useQuery
} from '@tanstack/react-query';

export const useGetFiles = () => {
  return useQuery<FileListResponse[]>({
    queryKey: ['file_list'],
    queryFn: async () => file.list()
  });
};

export const useFileMutation = (
  options?: UseMutationOptions<FileUploadResponse, Error, FileUploadInput>
) => {
  return useMutation<FileUploadResponse, Error, FileUploadInput>({
    mutationFn: async (variables: FileUploadInput) => {
      return file.upload(variables);
    },
    ...options
  });
};

export const useFileReset = (
  options?: UseMutationOptions<FileResetResponse, Error>
) => {
  return useMutation<FileResetResponse, Error>({
    mutationFn: async () => {
      return file.reset();
    },
    ...options
  });
};
