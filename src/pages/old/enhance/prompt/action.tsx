import TableSearchInput from '@/components/shared/table-search-input';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';
import { useEnhanceState } from '../hook/table';

export function TableAction() {
  const { setOpen } = useDialog();
  const { set } = useEnhanceState();

  const handleClick = () => {
    set({
      actionType: 'create'
    });
    setOpen(true);
  };

  return (
    <div className="mb-4 flex flex-1 flex-col items-center justify-between gap-2 sm:flex-row">
      <TableSearchInput placeholder="Search data...." />
      <Button className="w-full sm:w-fit" onClick={handleClick}>
        Add Data
      </Button>
    </div>
  );
}
