/* eslint-disable react-hooks/exhaustive-deps */
import DashboardCard from '@/components/shared/card';
import { useGetMainCount } from '../queries';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { ditlantasPayload } from '@/constants/dashboard';
import { refetchQueries } from '@/lib/refetcher';
import { useDataResult } from '@/hooks/use-dataresult';

export const DitlantasCard = () => {
  const { messages } = useDataResult();
  const { data, isLoading } = useGetMainCount(ditlantasPayload);

  React.useEffect(() => {
    refetchQueries(['dashboard_bpka', ditlantasPayload]);
  }, [messages]);

  if (isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />;

  const count = data.data?.total ?? 0;

  return <DashboardCard title="DITLANTAS" value={count} unit="Kendaraan" />;
};
