import { FEDataTable } from '@/components/shared/data-table-fe';
import { columns } from './columns';
import { EnhanceTypes } from '@/types/enhance';
import { useGetEnhance } from '../queries';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Table() {
  const [searchParams] = useSearchParams();
  const { data, isLoading } = useGetEnhance();

  const search = searchParams.get('search') ?? '';

  const list = React.useMemo(() => {
    let filtered =
      data?.data.map(([id, type, value, timestamp]) => ({
        id,
        type: type as EnhanceTypes,
        value,
        timestamp
      })) ?? [];

    if (search !== '') {
      filtered = filtered.filter(({ type, value }) =>
        [type, value].some((terms) =>
          terms?.toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    return filtered;
  }, [data, search]);

  return (
    <FEDataTable columns={columns} data={list ?? []} loading={isLoading} />
  );
}
