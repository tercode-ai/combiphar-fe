import React from 'react';
import { FormSection } from './form';
import { useEnhanceState } from '../hook/table';
import { capitalizeFirstLetter } from '@/lib/utils';
import { DeleteSection as DeleteSectionPrimitive } from '@/components/shared/delete';
import { useDeleteEnhance } from '../queries';
import { refetchQueries } from '@/lib/refetcher';
import { useDialog } from '@/hooks/use-dialog';
import { toast } from '@/components/ui/use-toast';

const DialogLayout = React.lazy(
  () => import('@/components/layout/dialog-layout')
);

export const Dialog = () => {
  const { actionType } = useEnhanceState();

  const isForm = ['create', 'edit'].includes(String(actionType));
  const isDelete = ['delete'].includes(String(actionType));

  return (
    <React.Suspense fallback="...">
      <DialogLayout
        title={`${capitalizeFirstLetter(String(actionType))} Chat Enhancement`}
      >
        <div className="flex flex-col space-y-4">
          {isForm && <FormSection />}
          {isDelete && <DeleteSection />}
        </div>
      </DialogLayout>
    </React.Suspense>
  );
};

const DeleteSection = () => {
  const {
    data: { id }
  } = useEnhanceState();
  const { setOpen } = useDialog();

  const { mutateAsync } = useDeleteEnhance({
    onSuccess: () => {
      refetchQueries(['list_enhance']);
      setOpen(false);
      toast({
        variant: 'default',
        title: 'Data deleted successfully'
      });
    }
  });

  const handleDelete = async () => {
    await mutateAsync({
      id
    });
  };

  return <DeleteSectionPrimitive onDelete={handleDelete} />;
};
