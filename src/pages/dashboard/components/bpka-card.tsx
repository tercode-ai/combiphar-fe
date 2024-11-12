/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMainCount } from '../queries';
import DashboardCard from '@/components/shared/card';
import React from 'react';
import { bpkaPayload } from '@/constants/dashboard';
import { refetchQueries } from '@/lib/refetcher';
import { useDataResult } from '@/hooks/use-dataresult';

export const BpkaCard = () => {
  const { messages } = useDataResult();
  const { data, isLoading } = useGetMainCount(bpkaPayload);

  React.useEffect(() => {
    refetchQueries(['dashboard_bpka', bpkaPayload]);
  }, [messages]);

  if (isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />;

  const count = data.data?.total ?? 0;

  return <DashboardCard title="BPKA" value={count} unit="Kendaraan" />;
};
