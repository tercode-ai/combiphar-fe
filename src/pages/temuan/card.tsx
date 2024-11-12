import DashboardCard from '@/components/shared/card';
import { useGetTemuanCount } from './queries';
import { Skeleton } from '@/components/ui/skeleton';

export default function TemuanCard() {
  const { data: dataJR, isLoading } = useGetTemuanCount('jasa_raharja');
  const { data: dataDl } = useGetTemuanCount('dit_lantas');

  if (isLoading)
    return (
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Skeleton className="h-[125px] w-full rounded-xl" />
      </div>
    );

  const countDl = dataDl?.data?.total ?? 0;
  const countJR = dataJR?.data?.total ?? 0;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      <DashboardCard title="JASA RAHARJA" value={countJR} unit="Temuan" />
      <DashboardCard title="DITLANTAS" value={countDl} unit="Temuan" />
    </div>
  );
}
