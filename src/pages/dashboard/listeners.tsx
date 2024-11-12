import { useDataResult } from '@/hooks/use-dataresult';
import { useSocket } from '@/hooks/use-socket';
import { cn } from '@/lib/utils';
import React from 'react';

export default function SocketListeners() {
  const { messages, isConnected } = useSocket('dataResult');
  const { set } = useDataResult();

  React.useEffect(() => {
    set(messages);
  }, [set, messages]);

  return (
    <div
      className={cn(
        'absolute -right-4 -top-4 size-2 rounded-full',
        isConnected ? 'bg-green-600' : 'bg-destructive'
      )}
    />
  );
}
