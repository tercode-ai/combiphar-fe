import { useState } from 'react';
import Sidebar from '../shared/sidebar';
import Header from '../shared/header';
import MobileSidebar from '../shared/mobile-sidebar';

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen overflow-hidden bg-secondary">
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Sidebar />
      <div className="flex w-0 flex-1 flex-col overflow-hidden">
        <div className="h-10">
          <Header onToggleClick={() => setSidebarOpen(true)} />
        </div>
        <main className="relative mt-8 h-screen overflow-auto bg-background focus:outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
