import DashboardNav from '@/components/shared/dashboard-nav';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { adminItems, userItems } from '@/constants/data';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { LogoutButton } from '@/pages/auth/logout';
import { useAuth } from '@/providers/auth-provider';

type TMobileSidebarProps = {
  className?: string;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
};
export default function MobileSidebar({
  setSidebarOpen,
  sidebarOpen
}: TMobileSidebarProps) {
  const { role } = useAuth();

  const navItems = role === 'admin' ? adminItems : userItems;

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent
        side="left"
        className="flex w-72 flex-col border-0 bg-sidebar !px-0 text-white"
      >
        <div className="space-y-42">
          <div className="space-y-8 px-3 py-2">
            <Link to="/" className="px-5 py-2 font-bold">
              Combiphar POC LLM
            </Link>
            <div className="space-y-1 px-2">
              <DashboardNav items={navItems} setOpen={setSidebarOpen} />
            </div>
          </div>
        </div>
        <LogoutButton isMinimized={false} />
      </SheetContent>
    </Sheet>
  );
}
