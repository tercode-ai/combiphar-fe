import { File } from 'lucide-react';

import { LoaderCircle } from '@/components/shared/loader';
import { excludeFileByName } from '@/lib/utils';
import { formatDate } from '@/lib/date';

import { useGetFiles } from '../_hooks/use-get-files';

export const FileList = () => {
  const { data, isLoading } = useGetFiles();

  const files = excludeFileByName(data);

  if (isLoading) return <LoaderCircle />;

  return (
    <div className="flex w-full flex-col gap-4">
      {files?.map(({ file, timestamp }, index) => (
        <div
          key={index}
          className="flex w-full flex-row items-center gap-4 rounded-lg border p-2 duration-100"
        >
          <div className="flex w-full items-center gap-2">
            <span className="flex size-12 items-center justify-center">
              <File className="size-9" />
            </span>
            <div>
              <h1 className="text-sm font-semibold">{file}</h1>
              <p className="text-sm text-muted-foreground">
                {formatDate(timestamp)}
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="h-12" />
    </div>
  );
};
