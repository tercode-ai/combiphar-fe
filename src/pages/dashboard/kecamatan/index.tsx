/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from '@/routes/hooks';
import { Outlet } from 'react-router-dom';
import { RegionCard } from '../components/region-card';
import { useEffect } from 'react';
import { useBreadcrumbStore } from '@/hooks/use-breadcrumb';
import { useGetKelurahan } from '../queries';
import { RegionData } from '@/types/dashboard';
import { LoaderCircle } from '@/components/shared/loader';
import { refetchQueries } from '@/lib/refetcher';
import { useDataResult } from '@/hooks/use-dataresult';

export default function KecamatanPage() {
  const path = usePathname();
  const { messages } = useDataResult();
  const { routes, setRoutes } = useBreadcrumbStore();

  const isKecamatanPath = path.split('/').length === 4;

  const code = path.split('/').pop() ?? '';

  const { data, isLoading, error } = useGetKelurahan(code);

  useEffect(() => {
    if (isKecamatanPath) {
      refetchQueries(['bpka_kelurahan']);
      const newRoutes = routes.slice(0, 3);
      setRoutes(newRoutes);
    }
  }, [path, messages]);

  if (isLoading) return <LoaderCircle />;

  if (error) return undefined;

  const list: RegionData[] = data?.data ?? [];

  const sortedList = list.sort((a, b) => {
    if (a.name === '') return 1;
    if (b.name === '') return -1;
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      {isKecamatanPath && (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sortedList.map((data, idx) => (
            <RegionCard key={idx} data={data} routeOnClick={data.id} />
          ))}
        </div>
      )}
      <Outlet />
    </>
  );
}
