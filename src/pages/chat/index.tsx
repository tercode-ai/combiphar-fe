/* eslint-disable react-hooks/exhaustive-deps */
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage
} from '@/components/ui/chat/chat-bubble';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import React from 'react';
import { useChat } from './queries';
import { useChatStore } from '@/hooks/use-chatstore';
import { ScrollArea } from '@/components/ui/scroll-area';
import { usePathname } from '@/routes/hooks';
import { ChatActions } from './chat-action';
import { InitialMessage } from './initial';
import { ChatWithTypingEffect, RenderChat } from './chat-render';
import { defaultChat } from '@/constants/chat';
import { getUniqSourceDocument } from '@/lib/utils';
import { RenderSourceDoc } from './source-document';
import { ChatClear } from './chat-clear';

const ChatPage = () => {
  const [input, setInput] = React.useState<string>('');
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);

  const { messages, addChat, setChat } = useChatStore();

  const { mutate, isPending } = useChat({
    onSuccess: ({ result }) => {
      addChat({
        id: new Date().getTime().toString(),
        role: 'assistant',
        message: result.answer,
        isTyping: true,
        isCopied: false,
        sourceDocument:
          result.source_documents.length > 1
            ? getUniqSourceDocument(result.source_documents)
            : undefined
      });
    }
  });

  const isChatPage = usePathname() === '/chat';
  const isChatEmpty = messages.length > 0;

  const showClearChat = React.useMemo(() => {
    return isChatPage && isChatEmpty;
  }, [isChatEmpty, isChatPage]);

  const handleSubmit = async () => {
    setInput('');
    mutate({
      question: input
    });
  };

  const messagesRef = React.useRef<HTMLDivElement>(null);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!scrollAreaRef.current) return;

    const scrollContainer = scrollAreaRef.current.querySelector(
      '[data-radix-scroll-area-viewport]'
    );
    if (scrollContainer instanceof HTMLElement) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight
      });
    }

    if (messages.length === 0) {
      setChat(defaultChat);
    }
  }, [messages]);

  const formRef = React.useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    addChat({
      id: new Date().getTime().toString(),
      role: 'user',
      message: input
    });
    handleSubmit();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isPending || !input) return;
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  React.useEffect(() => {
    if (!isPending) setIsGenerating(false);
  }, [isPending]);

  return (
    <ScrollArea
      ref={scrollAreaRef}
      className="flex h-[calc(100vh-7.5rem)] w-full items-center py-6"
    >
      <ChatMessageList ref={messagesRef} className="mx-auto max-w-[90%]">
        {/* Initial Message */}
        {messages.length === 0 && <InitialMessage />}

        {/* Messages */}
        {messages &&
          messages.map(
            ({ id, message, role, isTyping, sourceDocument }, index) => (
              <ChatBubble
                key={index}
                variant={role == 'user' ? 'sent' : 'received'}
                className=""
              >
                <div className="pb-4">
                  {role === 'assistant' && (
                    <ChatBubbleAvatar
                      className="mb-0"
                      src="/vita.jpg"
                      fallback={'🤖'}
                    />
                  )}
                </div>
                <ChatBubbleMessage>
                  {messages.length - 1 === index && isTyping ? (
                    <ChatWithTypingEffect
                      chatId={id}
                      message={message}
                      sourceDocument={sourceDocument}
                    />
                  ) : (
                    <>
                      <RenderChat message={message} />
                      {sourceDocument && (
                        <RenderSourceDoc sources={sourceDocument} />
                      )}
                    </>
                  )}

                  {role === 'assistant' && index !== 0 && (
                    <ChatActions
                      index={index}
                      isGenerating={isGenerating}
                      setIsGenerating={setIsGenerating}
                    />
                  )}
                </ChatBubbleMessage>
              </ChatBubble>
            )
          )}

        {/* Loading */}
        {isGenerating && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="🤖" />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        )}
      </ChatMessageList>
      <div className="flex justify-center px-4">
        <div className="fixed bottom-4 flex w-10/12 items-center gap-1 md:w-7/12 2xl:w-5/12">
          <form
            ref={formRef}
            onSubmit={onSubmit}
            className="w-full rounded-full border bg-background focus-within:ring-1 focus-within:ring-ring"
          >
            <div className="flex items-center justify-between px-3">
              <ChatInput
                value={input}
                onKeyDown={onKeyDown}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type message here"
                className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
              />
              <Button
                disabled={!input || isPending}
                type="submit"
                size="sm"
                className="size-8 rounded-full p-0"
              >
                <ArrowUp className="size-5" />
              </Button>
            </div>
          </form>
          {showClearChat && <ChatClear />}
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChatPage;
