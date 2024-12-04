import { Button } from '../ui/button';

interface Props {
  onDelete: () => void;
}

export const DeleteSection = ({ onDelete }: Props) => {
  return (
    <div>
      <h2>Are you sure want to delete this entry?</h2>
      <div className="mt-6 flex justify-end">
        <Button variant="destructive" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
};
