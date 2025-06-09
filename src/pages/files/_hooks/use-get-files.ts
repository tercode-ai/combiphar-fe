import { useQuery } from '@tanstack/react-query';
import { FileListResponse } from '@/types/file';

export const useGetFiles = () => {
  return useQuery<FileListResponse[]>({
    queryKey: ['file_list'],
    // queryFn: async () => file.list()
    queryFn: async () =>
      Promise.resolve([
        {
          file: 'example.txt',
          timestamp: new Date().toISOString()
        },
        {
          file: 'sample.pdf',
          timestamp: new Date().toISOString()
        }
      ])
  });
};
