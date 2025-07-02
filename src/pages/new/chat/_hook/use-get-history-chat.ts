import { useQuery } from '@tanstack/react-query';
import { getDetailHistory } from '@/api/chat/api';
import { TClearChatRequest } from '@/api/chat/type';

interface UseGetDetailHistoryParams {
  request: TClearChatRequest;
}

interface UseGetDetailHistoryResult {
  data: TClearChatRequest | undefined;
  isLoading: boolean;
  error: unknown;
}

export const useGetDetailHistory = (
  request: UseGetDetailHistoryParams['request']
): UseGetDetailHistoryResult => {
  const query = useQuery<TClearChatRequest>({
    queryKey: ['history-detail-chat'],
    queryFn: async () => getDetailHistory(request)
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error
  };
};
