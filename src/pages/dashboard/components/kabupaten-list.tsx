/* eslint-disable react-hooks/exhaustive-deps */
import { useGetKabupaten } from '../queries';
import { RegionData, WilayahSectionProps } from '@/types/dashboard';
import { usePathname } from '@/routes/hooks';
import { useEffect } from 'react';
import { useBreadcrumbStore } from '@/hooks/use-breadcrumb';
import { RegionCard } from './region-card';
import { LoaderCircle } from '@/components/shared/loader';
import { refetchQueries } from '@/lib/refetcher';
import { useSocket } from '@/hooks/use-socket';

import _ from 'lodash';
import {
  baratSelatanOrders,
  kepulauanOrders,
  tengahOrders,
  timurOrders
} from '@/constants/dashboard';

export const KabupatenList = () => {
  const path = usePathname();
  const { messages } = useSocket('dataResult');
  const { routes, setRoutes } = useBreadcrumbStore();
  const { data, isLoading, error } = useGetKabupaten();

  useEffect(() => {
    refetchQueries(['bpka_kabupaten']);
    const newRoutes = routes.slice(0, 1);
    setRoutes(newRoutes);
  }, [path, messages]);

  if (isLoading) return <LoaderCircle />;

  if (error) return undefined;

  const list: RegionData[] = data?.data ?? [];

  const sortedList = list.sort((a, b) => a.id.localeCompare(b.id));

  const groupedList = _.groupBy(sortedList, 'wilayah');

  const timurList = _.sortBy(groupedList['TIMUR'], (item) =>
    timurOrders.indexOf(item.name)
  );
  const baratSelatanList = _.sortBy(groupedList['BARAT SELATAN'], (item) =>
    baratSelatanOrders.indexOf(item.name)
  );
  const tengahList = _.sortBy(groupedList['TENGAH'], (item) =>
    tengahOrders.indexOf(item.name)
  );
  const kepulauanList = _.sortBy(groupedList['KEPULAUAN'], (item) =>
    kepulauanOrders.indexOf(item.name)
  );

  return (
    <div className="space-y-6">
      <WilayahSection title="TIMUR" data={timurList} />
      <WilayahSection title="BARAT SELATAN" data={baratSelatanList} />
      <WilayahSection title="TENGAH" data={tengahList} />
      <WilayahSection title="KEPULAUAN" data={kepulauanList} />
    </div>
  );
};

const WilayahSection = ({ title, data }: WilayahSectionProps) => (
  <div className="space-y-2">
    <h2 className="font-semibold tracking-wider">WILAYAH {title}</h2>
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {data.map((data, idx) => (
        <RegionCard key={idx} data={data} routeOnClick={data.id} />
      ))}
    </div>
  </div>
);
