import { Button } from '@/components/ui/button';
import { useChatStore } from '@/hooks/use-chatstore';
import { useClearChat } from './queries';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export const ChatClear = () => {
  const { setFetch } = useChatStore();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { mutateAsync } = useClearChat({
    onSuccess: () => {
      resetChat();
      setFetch(true);
    }
  });

  const { resetChat } = useChatStore();

  const handleReset = async () => {
    setIsSubmitting(true);
    await mutateAsync();
    setIsSubmitting(false);
  };

  return (
    <Button
      className="h-12 w-24 rounded-full"
      onClick={handleReset}
      disabled={isSubmitting}
    >
      {isSubmitting ? <Loader2 className="animate-spin" /> : 'New Chat'}
    </Button>
  );
};
