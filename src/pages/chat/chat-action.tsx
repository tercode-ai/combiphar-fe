import { ChatBubbleAction } from '@/components/ui/chat/chat-bubble';
import { useChatStore } from '@/hooks/use-chatstore';
import { Check, CopyIcon } from 'lucide-react';
import React from 'react';

export const ChatActions = ({
  index,
  isGenerating,
  setIsGenerating
}: {
  index: number;
  isGenerating: boolean;
  setIsGenerating: (val: boolean) => void;
}) => {
  const { messages, setBoolean } = useChatStore();

  const chatId = messages[index].id;

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
      setBoolean(chatId, 'isCopied', true);
      const message = messages[messageIndex];

      if (message && message.role === 'assistant') {
        navigator.clipboard.writeText(message.message);

        await new Promise((resolve) => setTimeout(resolve, 1500));
        setBoolean(chatId, 'isCopied', false);
      }
    }
  };

  const icon = React.useMemo(() => {
    if (messages[index].isCopied) {
      return <Check className="size-3" />;
    }
    return <CopyIcon className="size-3" />;
  }, [index, messages]);

  return (
    <div className="mt-1.5 flex items-center gap-1">
      {!isGenerating && (
        <ChatBubbleAction
          variant="ghost"
          className="size-6 rounded-lg"
          icon={icon}
          onClick={() => handleActionClick('Copy', index)}
        />
      )}
    </div>
  );
};
