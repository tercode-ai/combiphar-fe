/* eslint-disable react-hooks/exhaustive-deps */
import { formatDate } from '@/lib/utils';
import { useGetLastSynced } from './queries';
import React from 'react';
import { refetchQueries } from '@/lib/refetcher';
import { useDataResult } from '@/hooks/use-dataresult';

export function LastSync() {
  const { messages } = useDataResult();
  const { data, isLoading } = useGetLastSynced();

  React.useEffect(() => {
    refetchQueries(['last_synced']);
  }, [messages]);

  if (isLoading) return '...';

  const lastSynced = data?.data.ranmors[0].sync_at;

  return (
    <div className="mt-1 text-right text-sm tracking-tight text-muted-foreground">
      Last Sync : {formatDate(lastSynced, 'DD MMM YYYY HH:mm')}
    </div>
  );
}
