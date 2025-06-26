import CodeDisplayBlock from '@/components/shared/code-display-block';
import { useChatStore } from '@/hooks/use-chatstore';
import { SourceDocument } from '@/types/chat';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { RenderSourceDoc } from './source-document';
import { getGreeting } from '@/lib/utils';

export const ChatWithTypingEffect = ({
  chatId,
  message,
  sourceDocument
}: {
  chatId: string;
  message: string;
  sourceDocument?: SourceDocument[];
}) => {
  const { setBoolean } = useChatStore();

  const [typedMessage, setTypedMessage] = React.useState<string>('');
  const [showDoc, setShowDoc] = React.useState<boolean>(false);
  const typingSpeed = 10;

  React.useEffect(() => {
    setTypedMessage('');
    setBoolean(chatId, 'isTyping', true);

    let currentIndex = 0;
    const messageLength = message.length;

    const typeLetter = () => {
      if (currentIndex < messageLength) {
        setTypedMessage(message.slice(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeLetter, typingSpeed);
      } else {
        setBoolean(chatId, 'isTyping', false);
        setShowDoc(true);
      }
    };

    const timeoutId = setTimeout(() => {
      typeLetter();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      setBoolean(chatId, 'isTyping', false);
    };
  }, [message, chatId, typingSpeed, setBoolean]);

  return (
    <>
      <RenderChat
        message={typedMessage}
        context={{
          greeting: getGreeting()
        }}
      />
      {sourceDocument && showDoc && (
        <RenderSourceDoc sources={sourceDocument} />
      )}
    </>
  );
};

export const RenderChat = ({
  message,
  context
}: {
  message: string;
  context: Record<string, string>;
}) =>
  replacePlaceholders(message, context)
    .split('```')
    .map((part: string, index: number) => {
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

const replacePlaceholders = (
  template: string,
  context: Record<string, string>
): string => {
  return template.replace(/{{(.*?)}}/g, (_, key) => context[key.trim()] || '');
};
