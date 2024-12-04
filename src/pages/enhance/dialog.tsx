import React from 'react';
import { FormSection } from './form';

const DialogLayout = React.lazy(
  () => import('@/components/layout/dialog-layout')
);

export const Dialog = () => {
  return (
    <React.Suspense fallback="...">
      <DialogLayout title="Create Chat Enhancement">
        <div className="flex flex-col space-y-4">
          <FormSection />
        </div>
      </DialogLayout>
    </React.Suspense>
  );
};
