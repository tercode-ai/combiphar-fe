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
  ArrowUp,
  CopyIcon
  // CornerDownLeft,
  // Mic,
  // Paperclip,
  // RefreshCcw,
  // Volume2
} from 'lucide-react';
import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeDisplayBlock from '@/components/shared/code-display-block';
import { useChat } from './queries';
import { useChatStore } from '@/hooks/use-chatstore';
import { ScrollArea } from '@/components/ui/scroll-area';

const ChatAiIcons = [
  {
    icon: CopyIcon,
    label: 'Copy'
  }
  // {
  //   icon: RefreshCcw,
  //   label: 'Refresh'
  // },
  // {
  //   icon: Volume2,
  //   label: 'Volume'
  // }
];

const ChatPage = () => {
  const [isGenerating, setIsGenerating] = React.useState<boolean>(false);
  const [input, setInput] = React.useState<string>('');

  const { messages, addChat } = useChatStore();

  const { mutate, isPending } = useChat({
    onSuccess: ({ result }) => {
      addChat({
        id: new Date().getTime().toString(),
        role: 'assistant',
        message: result.answer,
        source_document:
          result.source_documents.length > 1
            ? result.source_documents[0]
            : undefined
      });
    }
  });

  // const {
  //   messages,
  //   // setMessages,
  //   input,
  //   handleInputChange,
  //   handleSubmit,
  //   isLoading,
  //   reload
  // } = useChat({
  //   onResponse(response) {
  //     if (response) {
  //       console.log(response);
  //       setIsGenerating(false);
  //     }
  //   },
  //   onError(error) {
  //     if (error) {
  //       setIsGenerating(false);
  //     }
  //   }
  // });

  const handleSubmit = async () => {
    setInput('');
    await new Promise((resolve) => setTimeout(resolve, 500));
    mutate({
      question: input
    });
  };

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

  const handleActionClick = async (action: string, messageIndex: number) => {
    console.log('Action clicked:', action, 'Message index:', messageIndex);
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
      const message = messages[messageIndex];
      if (message && message.role === 'assistant') {
        navigator.clipboard.writeText(message.message);
      }
    }
  };

  React.useEffect(() => {
    if (!isPending) setIsGenerating(false);
  }, [isPending]);

  // React.useEffect(() => {
  //   if (data) {
  //     addChat({
  //       id: new Date().getTime().toString(),
  //       role: 'assistant',
  //       message: data?.result.answer
  //     });
  //   }
  // }, [addChat, data]);

  return (
    <ScrollArea className="flex h-[calc(100vh-7.5rem)] w-full flex-col items-center py-6">
      <ChatMessageList ref={messagesRef} className="mx-auto max-w-3xl">
        {/* Initial Message */}
        {messages.length === 0 && (
          <div className="bg-backgroundp-8 flex h-full max-w-3xl flex-col items-center justify-center gap-2 rounded-lg">
            <h1 className="text-xl font-bold">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-[#532E91] to-[#D54399] bg-clip-text text-transparent">
                Combiphar
              </span>{' '}
              Smart Chat!
            </h1>
            <p className="text-sm text-muted-foreground">
              Feel free to ask me any questions or request help with your tasks.
            </p>
          </div>
        )}

        {/* Messages */}
        {messages &&
          messages.map(({ message, role }, index) => (
            <ChatBubble
              key={index}
              variant={role == 'user' ? 'sent' : 'received'}
            >
              <ChatBubbleAvatar src="" fallback={role == 'user' ? 'D' : '🤖'} />
              <ChatBubbleMessage className="">
                {message.split('```').map((part: string, index: number) => {
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

                {role === 'assistant' && messages.length - 1 === index && (
                  <div className="mt-1.5 flex items-center gap-1">
                    {!isGenerating &&
                      ChatAiIcons.map((icon, iconIndex) => {
                        const Icon = icon.icon;
                        return (
                          <ChatBubbleAction
                            variant="outline"
                            className="size-5 bg-muted"
                            key={iconIndex}
                            icon={<Icon className="size-3" />}
                            onClick={() => handleActionClick(icon.label, index)}
                          />
                        );
                      })}
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
      <div className="flex justify-center px-4">
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="fixed bottom-4 mx-auto w-10/12 rounded-full border bg-background focus-within:ring-1 focus-within:ring-ring md:w-7/12 2xl:w-5/12"
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
      </div>
    </ScrollArea>
  );
};

export default ChatPage;
