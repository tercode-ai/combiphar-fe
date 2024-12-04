import { Button } from '@/components/ui/button';
import { useChatStore } from '@/hooks/use-chatstore';
import { useClearChat } from './queries';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const ChatClear = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutateAsync } = useClearChat({
    onSuccess: () => {
      resetChat();
    }
  });

  const { resetChat } = useChatStore();

  const handleReset = async () => {
    setIsLoading(true);
    await mutateAsync();
    setIsLoading(false);
  };

  return (
    <Button
      className="h-12 w-24 rounded-full"
      onClick={handleReset}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : 'New Chat'}
    </Button>
  );
};
