import { file } from '@/lib/api';
import { FileListResponse } from '@/types/file';
import { useQuery } from '@tanstack/react-query';

export const useGetFiles = () => {
  return useQuery<FileListResponse[]>({
    queryKey: ['file_list'],
    queryFn: async () => file.list()
  });
};
