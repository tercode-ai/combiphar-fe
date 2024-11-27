import { Button } from '@/components/ui/button';
import { useChatStore } from '@/hooks/use-chatstore';
import { useClearChat } from './queries';

export const ChatClear = () => {
  const { mutateAsync } = useClearChat({
    onSuccess: () => {
      resetChat();
    }
  });

  const { resetChat } = useChatStore();

  const handleReset = async () => {
    mutateAsync();
  };

  return (
    <Button className="h-12 rounded-full" onClick={handleReset}>
      New Chat
    </Button>
  );
};
