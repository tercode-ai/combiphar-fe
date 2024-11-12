import { DataTable } from '@/components/shared/data-table';
import { TemuanTableAction } from './action';
import { columns } from './columns';
import { Ranmor } from '@/types/ranmor';

interface TemuanTableProps {
  data: Ranmor[];
  pagination: {
    page: number;
    limit: number;
    pageCount: number;
  };
  loading: boolean;
}

export default function TemuanTable({
  data,
  pagination,
  loading
}: TemuanTableProps) {
  return (
    <div>
      <TemuanTableAction />
      <DataTable
        columns={columns(pagination.page, pagination.limit)}
        data={data}
        pageCount={pagination.pageCount}
        loading={loading}
      />
    </div>
  );
}
