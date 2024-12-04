import { Button } from '@/components/ui/button';
import { useAuth } from '@/providers/auth-provider';
import { LogOut } from 'lucide-react';
import { useLogout } from './signin/queries';
import { useRouter } from '@/routes/hooks';

export const LogoutButton = ({ isMinimized }: { isMinimized: boolean }) => {
  const { replace } = useRouter();

  const { logout } = useAuth();
  const { mutate } = useLogout();

  const handleLogout = () => {
    mutate();
    logout();
    replace('/thankyou');
  };

  return (
    <Button
      onClick={handleLogout}
      variant="ghost"
      className="my-4 ml-1 mt-auto flex justify-start gap-2 text-sm tracking-tight hover:bg-white/10 hover:text-white"
    >
      <LogOut className="size-5" /> {isMinimized ? '' : 'Log Out'}
    </Button>
  );
};
