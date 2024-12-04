import { MenuIcon } from 'lucide-react';
import { ModeToggle } from './theme-toggle';
import { usePathname } from '@/routes/hooks';

interface HeaderProps {
  onToggleClick: () => void;
}

export default function Header({ onToggleClick }: HeaderProps) {
  const path = usePathname();
  const showEnhance = ['/enhance'].includes(path);
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
        {showEnhance && (
          <div>
            <div className="text-xl font-bold capitalize tracking-tight text-primary dark:text-primary-foreground">
              Chat Enhancement
            </div>
            <div className="text-xs uppercase leading-4 tracking-widest text-[#585858]">
              manage enhancement for prompt and response
            </div>
          </div>
        )}
      </div>
      <div className="relative flex items-center gap-3">
        <img src="/combiphar.png" alt="combiphar" className="h-8" />
        <ModeToggle />
      </div>
    </div>
  );
}
