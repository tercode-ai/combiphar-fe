import { ColumnDef } from '@tanstack/react-table';
import { Enhance } from '@/types/enhance';
import { formatDate } from '@/lib/utils';
import { ActionButtons } from '@/components/shared/row-action-button';
import { useEnhanceState } from './hook/table';
import { ActionType } from '@/types';

const typeLabel = {
  prefix: 'Prefix',
  postfix: 'Postfix'
};

// eslint-disable-next-line react-refresh/only-export-components
const ActionSection = ({ data }: { data: Enhance }) => {
  const { set } = useEnhanceState();

  const handleAction = (actionType: ActionType, data: Enhance) => {
    set({ actionType, data });
  };

  return <ActionButtons data={data} onAction={handleAction} />;
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
    cell: ({ row }) => {
      return <ActionSection data={row.original} />;
    }
  }
];
