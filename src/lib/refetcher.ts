import { queryClient } from './client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const refetchQueries = (keys: any) => {
  return queryClient.invalidateQueries({
    queryKey: [...keys]
  });
};
