import { ColumnDef } from '@tanstack/react-table';
import { Ranmor, RanmorStatus } from '@/types/ranmor';
import { formatDate } from '@/lib/utils';

const statusLabel = {
  jr: 'Jasa Raharja',
  bpka: 'BPKA',
  bpka_jr: 'BPKA - Jasa Raharja'
};

export const columns: (page: number, limit: number) => ColumnDef<Ranmor>[] = (
  page,
  limit
) => [
  {
    id: 'index',
    header: 'No',
    cell: ({ row }) => (
      <div className="px-1">{(page - 1) * limit + row.index + 1}</div>
    )
  },
  {
    accessorKey: 'no_polisi',
    header: 'Nomor Polisi'
  },
  {
    accessorKey: 'no_rangka',
    header: 'Nomor Rangka'
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => statusLabel[row.getValue('status') as RanmorStatus]
  },
  {
    accessorKey: 'sync_at',
    header: 'Last Synced',
    cell: ({ row }) => formatDate(row.getValue('sync_at'), 'DD/MM/YYYY HH:mm')
  }
];
