import { AlertCircle } from 'lucide-react';

export const LoginAlert = ({ message }: { message: string }) => {
  return message !== '' ? (
    <div className="flex items-center gap-2 rounded-[6px] border border-destructive px-3 py-2 text-xs font-medium capitalize text-destructive">
      <AlertCircle className="size-[.8rem]" />
      {message}
    </div>
  ) : null;
};
