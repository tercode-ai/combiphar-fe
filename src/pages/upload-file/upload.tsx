/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUpload } from '@/components/shared/file-upload';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';
import { FileUploadStatus, useFiles } from '@/hooks/use-files';
import { Upload } from 'lucide-react';
import React from 'react';
import { useFileMutation } from './queries';
import { refetchQueries } from '@/lib/refetcher';

const DialogLayout = React.lazy(
  () => import('@/components/layout/dialog-layout')
);

export const UploadSection = () => {
  const { setOpen } = useDialog();
  const { files, setFiles, isSubmitting, setIsSubmitting } = useFiles();
  const { mutateAsync } = useFileMutation({
    onSuccess: () => {
      refetchQueries(['file_list']);
    }
  });

  const uploadFilesSequential = async (files: FileUploadStatus[]) => {
    const { setFileStatus } = useFiles.getState();

    const unsuccessfulFiles = files.filter((item) => item.status !== 'success');

    for (const item of unsuccessfulFiles) {
      const fileId = item.id;
      setFileStatus(fileId, 'processing');
      try {
        await mutateAsync({ file: item.file });
        setFileStatus(fileId, 'success');
      } catch (error: any) {
        setFileStatus(fileId, 'failed', error.message);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await uploadFilesSequential(files);
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    const successCount = files.filter(
      (item) => item.status === 'success'
    ).length;
    if (successCount > 0 && successCount === files.length) {
      setOpen(false);
      setFiles([]);
    }
  }, [files]);

  return (
    <>
      <Button
        className="fixed bottom-4 gap-4 px-10 font-semibold"
        onClick={() => {
          setFiles([]);
          setOpen(true);
        }}
      >
        Upload <Upload className="size-4" />
      </Button>
      <React.Suspense fallback="...">
        <DialogLayout
          title="Upload Dokumen to Learn"
          // desc="File .pdf .docx .txt, maks 10 MB."
          footer={
            <Button
              disabled={files.length === 0 || isSubmitting}
              className="w-full"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <span>Uploading</span>{' '}
                </div>
              ) : (
                `Upload File${files.length > 1 ? 's' : ''}`
              )}
            </Button>
          }
        >
          <div className="flex flex-col space-y-4">
            <FileUpload
              accept={{
                'application/pdf': ['.pdf'],
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                  ['.docx'],
                'application/msword': ['.doc'],
                'text/plain': ['.txt']
              }}
              maxFiles={5}
              maxSize={10}
            />
          </div>
        </DialogLayout>
      </React.Suspense>
    </>
  );
};
