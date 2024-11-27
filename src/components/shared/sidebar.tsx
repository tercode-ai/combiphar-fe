'use client';
import DashboardNav from '@/components/shared/dashboard-nav';
import { adminItems, userItems } from '@/constants/data';
import { useSidebar } from '@/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { ChevronsLeft } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/providers/auth-provider';
import { LogoutButton } from '@/pages/auth/logout';

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { role } = useAuth();
  const { isMinimized, toggle } = useSidebar();
  const [status, setStatus] = useState(false);

  const handleToggle = () => {
    setStatus(true);
    toggle();
    setTimeout(() => setStatus(false), 500);
  };

  const navItems = role === 'admin' ? adminItems : userItems;

  return (
    <nav
      className={cn(
        `relative z-10 hidden h-screen flex-none bg-sidebar px-3 text-primary-foreground md:flex md:flex-col`,
        status && 'duration-500',
        !isMinimized ? 'w-64 2xl:w-72' : 'w-[90px]',
        className
      )}
    >
      <div
        className={cn(
          'flex items-center px-0 py-5 md:px-2',
          isMinimized ? 'justify-center ' : 'justify-between'
        )}
      >
        {!isMinimized && (
          <h1 className="font-bold text-primary-foreground">
            Combiphar POC LLM
          </h1>
        )}
        <ChevronsLeft
          className={cn(
            'size-6 cursor-pointer rounded-full text-primary-foreground',
            isMinimized && 'rotate-180'
          )}
          onClick={handleToggle}
        />
      </div>
      <div className="space-y-4 py-2">
        <div className="px-2 py-2">
          <div className="mt-3 space-y-1">
            <DashboardNav items={navItems} />
          </div>
        </div>
      </div>
      <LogoutButton isMinimized={isMinimized} />
    </nav>
  );
}
