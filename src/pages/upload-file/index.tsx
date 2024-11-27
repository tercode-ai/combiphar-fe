import { useRouter } from '@/routes/hooks';
import { FileList } from './file-list';
import { UploadSection } from './upload';
import { useAuth } from '@/providers/auth-provider';
import React from 'react';

const UploadFilePage = () => {
  const { role } = useAuth();
  const { back } = useRouter();

  React.useEffect(() => {
    if (role !== 'admin') {
      back();
    }
  }, [role, back]);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col items-center px-4 py-6">
      <h1 className="mb-6 w-full text-lg font-bold">Uploaded Files</h1>
      <FileList />
      <UploadSection />
    </div>
  );
};

export default UploadFilePage;
