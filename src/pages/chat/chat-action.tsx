import { ChatBubbleAction } from '@/components/ui/chat/chat-bubble';
import { useChatStore } from '@/hooks/use-chatstore';
import { CopyIcon } from 'lucide-react';

export const ChatActions = ({
  index,
  isGenerating,
  setIsGenerating
}: {
  index: number;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
}) => {
  const { messages } = useChatStore();
  const handleActionClick = async (action: string, messageIndex: number) => {
    if (action === 'Refresh') {
      setIsGenerating(true);
      try {
        // await reload();
      } catch (error) {
        console.error('Error reloading:', error);
      } finally {
        setIsGenerating(false);
      }
    }

    if (action === 'Copy') {
      // setIsCopied(true);
      const message = messages[messageIndex];

      if (message && message.role === 'assistant') {
        navigator.clipboard.writeText(message.message);
      }
    }
  };

  return (
    <div className="mt-1.5 flex items-center gap-1">
      {!isGenerating && (
        <ChatBubbleAction
          variant="ghost"
          className="size-6 rounded-lg"
          icon={<CopyIcon className="size-3" />}
          onClick={() => handleActionClick('Copy', index)}
        />
      )}
    </div>
  );
};
