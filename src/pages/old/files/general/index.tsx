import { FileList } from '../_components/file-list';
import { UploadComponent } from '../_components/upload';

const GeneralFile = () => {
  return (
    <div className="relative mx-auto flex h-full w-full max-w-3xl flex-col items-center px-4 py-6">
      <h1 className="mb-6 w-full text-lg font-bold">Uploaded Files</h1>
      <FileList />
      <UploadComponent />
    </div>
  );
};
export default GeneralFile;
