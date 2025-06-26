import MainContent from '@/components/ui/main-content';
import Sidebar from '@/components/ui/sidebar';

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-[#EEEEEE] font-sans text-[#1B212D] ">
      <Sidebar />
      <MainContent />
    </div>
  );
};
export default MainLayout;
