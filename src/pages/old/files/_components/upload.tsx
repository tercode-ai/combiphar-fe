/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FileUpload } from '@/components/shared/file-upload';
import { Button } from '@/components/ui/button';
import { useDialog } from '@/hooks/use-dialog';
import { FileUploadStatus, useFiles } from '@/hooks/use-files';
import React from 'react';
import { refetchQueries } from '@/lib/refetcher';
import { RefreshCcw, Upload } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useUploadFileMutation } from '../_hooks/use-upload-file';
import { useFileResetMutation } from '../_hooks/use-file-reset';

type ModeType = 'upload' | 'reset';

const DialogLayout = React.lazy(
  () => import('@/components/layout/dialog-layout')
);

export const UploadComponent = () => {
  const [mode, setMode] = React.useState<ModeType>('upload');

  return (
    <>
      <React.Suspense fallback="...">
        <DialogLayout
          title={
            mode === 'upload'
              ? 'Upload Document to Learn'
              : 'Reset All Documents'
          }
          footer={<RenderFooter mode={mode} />}
        >
          <>
            {mode === 'upload' && <UploadSection />}
            {mode === 'reset' && <ResetSection />}
          </>
        </DialogLayout>
      </React.Suspense>
      <ActionSection setMode={setMode} />
    </>
  );
};

const RenderFooter = ({ mode }: { mode: ModeType }) => {
  const { setOpen } = useDialog();
  const { files, setFiles, isSubmitting, setIsSubmitting } = useFiles();

  const { mutateAsync: asyncUpload } = useUploadFileMutation({
    onSuccess: () => {
      refetchQueries(['file_list']);
    }
  });

  const { mutateAsync: asyncReset } = useFileResetMutation({
    onSuccess: () => {
      refetchQueries(['file_list']);
      setOpen(false);
      toast({
        title: 'All Documents Deleted!'
      });
    }
  });

  const uploadFilesSequential = async (files: FileUploadStatus[]) => {
    const { setFileStatus } = useFiles.getState();

    const unsuccessfulFiles = files.filter((item) => item.status !== 'success');

    for (const item of unsuccessfulFiles) {
      const fileId = item.id;
      setFileStatus(fileId, 'processing');
      try {
        await asyncUpload({ file: item.file });
        setFileStatus(fileId, 'success');
      } catch (error: any) {
        setFileStatus(fileId, 'failed', error.message);
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (mode === 'upload') {
      await uploadFilesSequential(files);
    } else if (mode === 'reset') {
      await asyncReset();
    }
    setIsSubmitting(false);
  };

  React.useEffect(() => {
    const successCount = files.filter(
      (item) => item.status === 'success'
    ).length;
    if (successCount > 0 && successCount === files.length) {
      setOpen(false);
      setFiles([]);
      toast({
        title: 'All Files Uploaded!'
      });
    }
  }, [files]);

  return (
    <Button
      disabled={(mode === 'upload' && files.length === 0) || isSubmitting}
      className="w-full"
      onClick={handleSubmit}
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <span>
            {mode === 'upload' && 'Uploading'}
            {mode === 'reset' && 'Resetting'}
          </span>{' '}
        </div>
      ) : (
        <>
          {mode === 'upload' && (
            <>
              {`Upload File${files.length > 1 ? 's' : ''}`}
              <Upload className="ml-2 size-4" />
            </>
          )}
          {mode === 'reset' && (
            <>
              Reset Documents
              <RefreshCcw className="ml-2 size-4" />
            </>
          )}
        </>
      )}
    </Button>
  );
};

const UploadSection = () => {
  return (
    <section className="flex flex-col space-y-4">
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
    </section>
  );
};

const ResetSection = () => {
  return (
    <section>
      <h1 className="text-sm">
        All document data will be cleared from the database. Continue?
      </h1>
    </section>
  );
};

interface ActionProps {
  setMode: (value: ModeType) => void;
}

const ActionSection = ({ setMode }: ActionProps) => {
  const { setFiles } = useFiles();
  const { setOpen } = useDialog();

  return (
    <section className="fixed bottom-4 flex gap-2">
      <Button
        className="bg-primary px-8 font-semibold hover:brightness-90"
        onClick={() => {
          setFiles([]);
          setOpen(true);
          setMode('upload');
        }}
      >
        Add Files
      </Button>
      <Button
        className="bg-primary px-6 font-semibold hover:brightness-90"
        onClick={() => {
          setFiles([]);
          setOpen(true);
          setMode('reset');
        }}
      >
        Reset
      </Button>
    </section>
  );
};
