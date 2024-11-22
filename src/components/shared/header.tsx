import { MenuIcon } from 'lucide-react';
import { ModeToggle } from './theme-toggle';
// import { Button } from '../ui/button';
// import { useChatStore } from '@/hooks/use-chatstore';
// import React from 'react';
// import { usePathname } from '@/routes/hooks';

interface HeaderProps {
  onToggleClick: () => void;
}

export default function Header({ onToggleClick }: HeaderProps) {
  // const { messages, resetChat } = useChatStore();
  // const isChatPage = usePathname() === '/chat';
  // const isChatEmpty = messages.length > 0;

  // const showClearChat = React.useMemo(() => {
  //   return isChatPage && isChatEmpty;
  // }, [isChatEmpty, isChatPage]);

  return (
    <div className="relative flex flex-1 items-center justify-between bg-background px-6 py-[1.15rem]">
      <div className="flex gap-4">
        <button
          className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={onToggleClick}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        {/* {showClearChat && (
          <Button
            variant="outline"
            className="rounded-md text-sm"
            onClick={resetChat}
          >
            Clear Chat
          </Button>
        )} */}
      </div>
      <div className="relative flex items-center gap-3">
        <img src="/combiphar.png" alt="combiphar" className="h-8" />
        <ModeToggle />
      </div>
    </div>
  );
}
