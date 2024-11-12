import { DataTable } from '@/components/shared/data-table';
import { RanmorTableAction } from './action';
import { columns } from './columns';
import { Ranmor } from '@/types/ranmor';

interface RanmorTableProps {
  data: Ranmor[];
  pagination: {
    page: number;
    limit: number;
    pageCount: number;
  };
  loading: boolean;
}

export default function RanmorTable({
  data,
  pagination,
  loading
}: RanmorTableProps) {
  return (
    <div>
      <RanmorTableAction />
      <DataTable
        columns={columns(pagination.page, pagination.limit)}
        data={data}
        pageCount={pagination.pageCount}
        loading={loading}
      />
    </div>
  );
}
