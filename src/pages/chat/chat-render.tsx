import CodeDisplayBlock from '@/components/shared/code-display-block';
import { useChatStore } from '@/hooks/use-chatstore';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const ChatWithTypingEffect = ({
  chatId,
  message
}: {
  chatId: string;
  message: string;
}) => {
  const { setIsTyping } = useChatStore();

  const [typedMessage, setTypedMessage] = React.useState<string>('');
  const typingSpeed = 10;

  React.useEffect(() => {
    setTypedMessage('');
    setIsTyping(chatId, true);

    let currentIndex = 0;
    const messageLength = message.length;

    const typeLetter = () => {
      if (currentIndex < messageLength) {
        setTypedMessage(message.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeLetter, typingSpeed);
      } else {
        setIsTyping(chatId, false);
      }
    };

    const timeoutId = setTimeout(() => {
      typeLetter();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      setIsTyping(chatId, false);
    };
  }, [message, chatId, typingSpeed, setIsTyping]);

  return <RenderChat message={typedMessage} />;
};

export const RenderChat = ({ message }: { message: string }) =>
  message.split('```').map((part: string, index: number) => {
    if (index % 2 === 0) {
      return (
        <Markdown key={index} remarkPlugins={[remarkGfm]}>
          {part}
        </Markdown>
      );
    } else {
      return (
        <pre className="whitespace-pre-wrap pt-2" key={index}>
          <CodeDisplayBlock code={part} lang="" />
        </pre>
      );
    }
  });
