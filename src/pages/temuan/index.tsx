/* eslint-disable react-hooks/exhaustive-deps */
import PageHead from '@/components/shared/page-head';
import TemuanTable from './table';
import { useGetTemuanList } from './queries';
import { useSearchParams } from 'react-router-dom';
import TemuanCard from './card';
import React from 'react';
import { useBreadcrumbStore } from '@/hooks/use-breadcrumb';
import { route } from '@/constants/temuan';

export default function TemuanPage() {
  const [searchParams] = useSearchParams();
  const { setRoutes } = useBreadcrumbStore();

  React.useEffect(() => {
    setRoutes([route]);
  }, []);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';
  const source = searchParams.get('source') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  const { data, isLoading } = useGetTemuanList({
    page,
    limit,
    search,
    filter: {
      source,
      sync_at_date_start: from,
      sync_at_date_end: to
    }
  });

  const pageRes = data?.data?.page ?? 1;
  const limitRes = data?.data?.limit ?? 1;
  const totalPageRes = data?.data?.totalPage ?? 1;

  const temuans = data?.data?.bpka_temuans ?? [];

  return (
    <>
      <PageHead title={`Temuan | Samsat Aceh`} />
      <div className="max-h-full flex-1 space-y-6 overflow-y-auto p-4 pt-6 md:p-6">
        {/* <Breadcrumbs items={routes} /> */}
        <div className="space-y-10">
          <TemuanCard />
          <TemuanTable
            data={temuans}
            pagination={{
              page: pageRes,
              limit: limitRes,
              pageCount: totalPageRes
            }}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
}
