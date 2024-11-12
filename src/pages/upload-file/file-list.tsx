import { UploadedFile } from '@/constants/files';
import { ExternalLink, File } from 'lucide-react';

interface UploadedFilesProps {
  files: UploadedFile[];
}

export const FileList = (props: UploadedFilesProps) => {
  const { files } = props;

  return (
    <div className="flex w-full flex-col gap-4">
      {files.map((file, index) => (
        <a
          href={file.url}
          target="_blank"
          key={index}
          className="flex w-full flex-row items-center gap-4 rounded-lg border p-2 duration-100 hover:cursor-pointer hover:border-gray-700 hover:ease-in dark:hover:border-gray-300"
        >
          <div className="flex w-full items-center gap-2">
            <span className="flex size-12 items-center justify-center">
              <File className="size-9" />
            </span>
            <div>
              <h1 className="text-sm font-semibold">{file.name}</h1>
              <p className="text-sm text-muted-foreground">Subtitle</p>
            </div>
          </div>
          <div className="pr-2">
            <ExternalLink className="size-4" />
          </div>
        </a>
      ))}
    </div>
  );
};
