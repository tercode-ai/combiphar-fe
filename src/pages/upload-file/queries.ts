import { file } from '@/lib/api';
import {
  FileListResponse,
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
