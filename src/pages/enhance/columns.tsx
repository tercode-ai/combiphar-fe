import { ColumnDef } from '@tanstack/react-table';
import { Enhance } from '@/types/enhance';
import { formatDate } from '@/lib/utils';

const typeLabel = {
  prefix: 'Prefix',
  postfix: 'Postfix'
};

export const columns: ColumnDef<Enhance>[] = [
  {
    id: 'index',
    header: 'No',
    cell: ({ row }) => <div className="px-1">{row.index + 1}</div>
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => typeLabel[String(row.getValue('type'))]
  },
  {
    accessorKey: 'value',
    header: 'Value'
  },
  {
    accessorKey: 'timestamp',
    header: 'Date Created',
    cell: ({ row }) => formatDate(row.getValue('timestamp'), 'DD MMMM YYYY')
  },
  {
    id: 'action',
    cell: () => 'action'
  }
];
