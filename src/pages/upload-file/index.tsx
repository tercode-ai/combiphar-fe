import { FileList } from './file-list';
import { UploadButton } from './upload-button';

/* eslint-disable @typescript-eslint/no-explicit-any */
const UploadFilePage = () => {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col items-center px-4 py-6">
      <h1 className="mb-6 w-full text-lg font-bold">Uploaded Files</h1>
      <FileList />
      <UploadButton />
    </div>
  );
};

export default UploadFilePage;
