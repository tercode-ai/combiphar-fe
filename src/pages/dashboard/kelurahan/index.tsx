import { useGetRanmorList } from '../queries';
import { usePathname } from '@/routes/hooks';
import RanmorTable from './table';
import { useSearchParams } from 'react-router-dom';
import { useDataResult } from '@/hooks/use-dataresult';
import React from 'react';
import { refetchQueries } from '@/lib/refetcher';

export default function KelurahanPage() {
  const path = usePathname();
  const { messages } = useDataResult();

  const code = path.split('/').pop() ?? '';

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const search = searchParams.get('search') || '';
  const status = searchParams.get('status') || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';

  React.useEffect(() => {
    refetchQueries(['list_ranmor']);
  }, [messages]);

  const { data, isLoading } = useGetRanmorList({
    page,
    limit,
    search,
    filter: {
      kd_kel: code,
      status,
      sync_at_date_start: from,
      sync_at_date_end: to
    }
  });

  const pageRes = data?.data?.page ?? 1;
  const limitRes = data?.data?.limit ?? 1;
  const totalPageRes = data?.data?.totalPage ?? 1;

  const ranmors = data?.data?.ranmors ?? [];

  return (
    <RanmorTable
      data={ranmors}
      pagination={{
        page: pageRes,
        limit: limitRes,
        pageCount: totalPageRes
      }}
      loading={isLoading}
    />
  );
}
