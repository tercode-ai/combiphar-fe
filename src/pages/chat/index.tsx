import {
  ChatBubble,
  ChatBubbleAction,
  ChatBubbleAvatar,
  ChatBubbleMessage
} from '@/components/ui/chat/chat-bubble';
import { ChatInput } from '@/components/ui/chat/chat-input';
import { ChatMessageList } from '@/components/ui/chat/chat-message-list';
import { Button } from '@/components/ui/button';
import {
  CopyIcon,
  CornerDownLeft,
  Mic,
  Paperclip,
  RefreshCcw,
  Volume2
} from 'lucide-react';
import { useChat } from 'ai/react';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeDisplayBlock from '@/components/shared/code-display-block';
import { messages } from '@/constants/chat';

const ChatAiIcons = [
  {
    icon: CopyIcon,
    label: 'Copy'
  },
  {
    icon: RefreshCcw,
    label: 'Refresh'
  },
  {
    icon: Volume2,
    label: 'Volume'
  }
];

const ChatPage = () => {
  const [isGenerating, setIsGenerating] = React.useState(false);
  const {
    // messages,
    // setMessages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    reload
  } = useChat({
    onResponse(response) {
      if (response) {
        console.log(response);
        setIsGenerating(false);
      }
    },
    onError(error) {
      if (error) {
        setIsGenerating(false);
      }
    }
  });

  const messagesRef = React.useRef<HTMLDivElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);

  // React.useEffect(() => {
  //   if (messagesRef.current) {
  //     messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  //   }
  // }, [messages]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsGenerating(true);
    handleSubmit(e);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isGenerating || isLoading || !input) return;
      setIsGenerating(true);
      onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  const handleActionClick = async (action: string, messageIndex: number) => {
    console.log('Action clicked:', action, 'Message index:', messageIndex);
    if (action === 'Refresh') {
      setIsGenerating(true);
      try {
        await reload();
      } catch (error) {
        console.error('Error reloading:', error);
      } finally {
        setIsGenerating(false);
      }
    }

    if (action === 'Copy') {
      const message = messages[messageIndex];
      if (message && message.role === 'assistant') {
        navigator.clipboard.writeText(message.content);
      }
    }
  };
  return (
    <div className="mx-auto flex h-full w-full max-w-3xl flex-col items-center py-6">
      <ChatMessageList ref={messagesRef}>
        {/* Initial Message */}
        {messages.length === 0 && (
          <div className="flex w-full flex-col gap-2 rounded-lg border bg-background p-8 shadow-sm">
            <h1 className="font-bold">Welcome to this example app.</h1>
            <p className="text-sm text-muted-foreground">
              This is a simple Next.JS example application created using{' '}
              <a
                href="https://github.com/jakobhoeg/shadcn-chat"
                className="inline-flex flex-1 justify-center gap-1 font-bold leading-4 hover:underline"
              >
                shadcn-chat
                <svg
                  aria-hidden="true"
                  height="7"
                  viewBox="0 0 6 6"
                  width="7"
                  className="opacity-70"
                >
                  <path
                    d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>{' '}
              components. It uses{' '}
              <a
                href="https://sdk.vercel.ai/"
                className="inline-flex flex-1 justify-center gap-1 font-bold leading-4 hover:underline"
              >
                Vercel AI SDK
                <svg
                  aria-hidden="true"
                  height="7"
                  viewBox="0 0 6 6"
                  width="7"
                  className="opacity-70"
                >
                  <path
                    d="M1.25215 5.54731L0.622742 4.9179L3.78169 1.75597H1.3834L1.38936 0.890915H5.27615V4.78069H4.40513L4.41109 2.38538L1.25215 5.54731Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>{' '}
              for the AI integration. Build chat interfaces like this at
              lightspeed with shadcn-chat.
            </p>
          </div>
        )}

        {/* Messages */}
        {messages &&
          messages.map((message, index) => (
            <ChatBubble
              key={index}
              variant={message.role == 'user' ? 'sent' : 'received'}
            >
              <ChatBubbleAvatar
                src=""
                fallback={message.role == 'user' ? '👨🏽' : '🤖'}
              />
              <ChatBubbleMessage>
                {message.content
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
                  })}

                {message.role === 'assistant' &&
                  messages.length - 1 === index && (
                    <div className="mt-1.5 flex items-center gap-1">
                      {!isGenerating && (
                        <>
                          {ChatAiIcons.map((icon, iconIndex) => {
                            const Icon = icon.icon;
                            return (
                              <ChatBubbleAction
                                variant="outline"
                                className="size-5"
                                key={iconIndex}
                                icon={<Icon className="size-3" />}
                                onClick={() =>
                                  handleActionClick(icon.label, index)
                                }
                              />
                            );
                          })}
                        </>
                      )}
                    </div>
                  )}
              </ChatBubbleMessage>
            </ChatBubble>
          ))}

        {/* Loading */}
        {isGenerating && (
          <ChatBubble variant="received">
            <ChatBubbleAvatar src="" fallback="🤖" />
            <ChatBubbleMessage isLoading />
          </ChatBubble>
        )}
      </ChatMessageList>
      <div className="w-full px-4">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="relative rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
          <ChatInput
            value={input}
            onKeyDown={onKeyDown}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="min-h-12 resize-none rounded-lg border-0 bg-background p-3 shadow-none focus-visible:ring-0"
          />
          <div className="flex items-center p-3 pt-0">
            <Button variant="ghost" size="icon">
              <Paperclip className="size-4" />
              <span className="sr-only">Attach file</span>
            </Button>

            <Button variant="ghost" size="icon">
              <Mic className="size-4" />
              <span className="sr-only">Use Microphone</span>
            </Button>

            <Button
              disabled={!input || isLoading}
              type="submit"
              size="sm"
              className="ml-auto gap-1.5"
            >
              Send Message
              <CornerDownLeft className="size-3.5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
