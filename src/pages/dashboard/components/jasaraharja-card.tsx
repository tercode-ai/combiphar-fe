/* eslint-disable react-hooks/exhaustive-deps */
import { Skeleton } from '@/components/ui/skeleton';
import { useGetMainCount } from '../queries';
import DashboardCard from '@/components/shared/card';
import React from 'react';
import { jasaRaharjaPayload } from '@/constants/dashboard';
import { refetchQueries } from '@/lib/refetcher';
import { useDataResult } from '@/hooks/use-dataresult';

export const JasaRaharjaCard = () => {
  const { messages } = useDataResult();
  const { data, isLoading } = useGetMainCount(jasaRaharjaPayload);

  React.useEffect(() => {
    refetchQueries(['dashboard_bpka', jasaRaharjaPayload]);
  }, [messages]);

  if (isLoading) return <Skeleton className="h-[125px] w-full rounded-xl" />;

  const count = data?.data?.total ?? 0;

  return <DashboardCard title="JASA RAHARJA" value={count} unit="Kendaraan" />;
};
