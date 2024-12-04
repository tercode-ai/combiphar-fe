import { SquarePen, Trash2 } from 'lucide-react';

import { useDialog } from '@/hooks/use-dialog';
import { ActionType } from '@/types';

import { Button } from '../ui/button';

interface Props<T> {
  data: T;
  onAction: (actionType: ActionType, dataSelected: T) => void;
}

export const ActionButtons = <T,>({ data, onAction }: Props<T>) => {
  const { setOpen } = useDialog();

  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setOpen(true);
          onAction('edit', data);
        }}
      >
        <SquarePen className="size-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setOpen(true);
          onAction('delete', data);
        }}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  );
};
