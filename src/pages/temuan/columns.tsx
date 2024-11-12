import { ColumnDef } from '@tanstack/react-table';
import { Ranmor } from '@/types/ranmor';
import { formatDate } from '@/lib/utils';
import { TemuanSource } from '@/types/temuan';

const statusLabel = {
  jasa_raharja: 'Jasa Raharja',
  dit_lantas: 'Ditlantas'
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
    accessorKey: 'source',
    header: 'Source',
    cell: ({ row }) => statusLabel[row.getValue('source') as TemuanSource]
  },
  {
    accessorKey: 'sync_at',
    header: 'Last Synced',
    cell: ({ row }) => formatDate(row.getValue('sync_at'), 'DD/MM/YYYY HH:mm')
  }
];
