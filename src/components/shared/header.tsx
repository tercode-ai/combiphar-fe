import { MenuIcon } from 'lucide-react';
import { ModeToggle } from './theme-toggle';
import { Button } from '../ui/button';
import { useChatStore } from '@/hooks/use-chatstore';

interface HeaderProps {
  onToggleClick: () => void;
}

export default function Header({ onToggleClick }: HeaderProps) {
  const { resetChat } = useChatStore();
  return (
    <div className="flex flex-1 items-center justify-between bg-background px-6 py-[1.15rem]">
      <div className="flex gap-4">
        <button
          className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          onClick={onToggleClick}
        >
          <span className="sr-only">Open sidebar</span>
          <MenuIcon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div>
          {/* <Heading title={headingText} /> */}
          {/* <Breadcrumbs items={routes} /> */}
        </div>
      </div>
      <div className="relative flex items-center gap-2">
        <Button
          variant="outline"
          className="rounded-md text-sm"
          onClick={resetChat}
        >
          {/* <X className="mr-2 size-5" /> */}
          Clear Chat
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
}
