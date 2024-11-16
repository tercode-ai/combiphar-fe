/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUpload } from '@/components/shared/file-upload';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';
import { FileUploadStatus, useFiles } from '@/hooks/use-files';
import { Loader2, Upload } from 'lucide-react';
import React from 'react';
import { useFileMutation } from './queries';

const DialogLayout = React.lazy(
  () => import('@/components/layout/dialog-layout')
);

export const UploadSection = () => {
  const { setOpen } = useDialog();
  const { files, setFiles } = useFiles();
  const { mutateAsync } = useFileMutation();
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  // console.log(files);

  const uploadFilesSequential = async (files: FileUploadStatus[]) => {
    const { setFileStatus } = useFiles.getState();

    for (const item of files) {
      const fileId = item.id;
      try {
        await mutateAsync({ file: item.file });
        setFileStatus(fileId, 'success');
      } catch (error: any) {
        console.log('error');
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
        onClick={() => setOpen(true)}
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
                  <Loader2 className="size-5 animate-spin" />
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
