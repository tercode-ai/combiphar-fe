import MainContent from '@/components/ui/main-content';
import Sidebar from '@/components/ui/sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-neutral-100 font-sans">
      <Sidebar />
      <MainContent />
    </div>
  );
};
export default MainLayout;
