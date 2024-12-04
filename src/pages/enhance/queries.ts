import { enhance } from '@/lib/fetch';
import { ListEnhanceResponse } from '@/types/enhance';
import { useQuery } from '@tanstack/react-query';

export const useGetEnhance = () => {
  return useQuery<ListEnhanceResponse>({
    queryKey: ['list_enhance'],
    queryFn: async () => enhance.list()
  });
};

// export const useGetTemuanList = (input: ListTemuanInput) => {
//   const { page, limit, search, filter } = input;
//   return useQuery({
//     queryKey: [
//       'list_temuan',
//       page,
//       limit,
//       search,
//       filter?.source,
//       filter?.sync_at_date_end
//     ],
//     queryFn: async () => temuan.list(input)
//   });
// };
