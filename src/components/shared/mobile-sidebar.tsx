import DashboardNav from '@/components/shared/dashboard-nav';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { navItems } from '@/constants/data';
import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';
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
  const { logout } = useAuth();

  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent
        side="left"
        className="flex w-72 flex-col border-0 bg-primary !px-0 text-white"
      >
        <div className="space-y-42">
          <div className="space-y-8 px-3 py-2">
            <Link to="/" className="px-5 py-2 text-xl font-bold">
              Combiphar ChatApp
            </Link>
            <div className="space-y-1 px-2">
              <DashboardNav items={navItems} setOpen={setSidebarOpen} />
            </div>
          </div>
        </div>
        <Button
          onClick={logout}
          variant="ghost"
          className="my-4 ml-1 mt-auto flex justify-start gap-2 text-sm tracking-tight hover:bg-white/10 hover:text-white"
        >
          <LogOut className="size-5" /> Log Out
        </Button>
      </SheetContent>
    </Sheet>
  );
}
