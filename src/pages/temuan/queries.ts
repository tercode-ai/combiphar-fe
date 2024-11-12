import { temuan } from '@/lib/api';
import { ListTemuanInput, TemuanSource } from '@/types/temuan';
import { useQuery } from '@tanstack/react-query';

export const useGetTemuanCount = (type: TemuanSource) => {
  return useQuery({
    queryKey: ['count_temuan', type],
    queryFn: async () => temuan.count({ type })
  });
};

export const useGetTemuanList = (input: ListTemuanInput) => {
  const { page, limit, search, filter } = input;
  return useQuery({
    queryKey: [
      'list_temuan',
      page,
      limit,
      search,
      filter?.source,
      filter?.sync_at_date_end
    ],
    queryFn: async () => temuan.list(input)
  });
};
