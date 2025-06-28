import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type TDetail = {
  document_link: string;
  document_name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

interface Props {
  open?: boolean;
  onOpenChange: () => void;
  data?: Partial<TDetail>;
  onDelete: (data?: Partial<TDetail>) => void;
}

const DeleteModal = ({ onDelete, data, open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="no-scrollbar sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Delete Document</DialogTitle>
        </DialogHeader>

        <p>
          Document{' '}
          <span className="font-semibold">{data?.document_name ?? '-'}</span>{' '}
          will be deleted from the database. Continue ?
        </p>
        <DialogFooter className="mt-2 sm:justify-start">
          <Button
            variant="destructive"
            type="submit"
            className="w-full"
            onClick={() => onDelete(data)}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
