import { ChevronDownIcon } from '@radix-ui/react-icons';
import { Outlet } from 'react-router-dom';

const MainContent = () => {
  return (
    <main className="flex flex-1 flex-col p-6 text-gray-800">
      <header className="mb-10 flex items-center justify-between">
        <img src="/icons/logo.png" className="h-6" />
        <div className="flex cursor-pointer items-center rounded-full border border-gray-200 bg-white p-1 hover:shadow-sm">
          <img
            src="https://i.pravatar.cc/40?u=marvin"
            alt="Marvin McKinney"
            className="h-9 w-9 rounded-full"
          />
          <div className="ml-3 mr-5">
            <p className="text-sm font-semibold text-gray-800">
              Marvin McKinney
            </p>
            <p className="mt-1 text-xs text-gray-500">BUSINESS PLAN</p>
          </div>
          <ChevronDownIcon className="mr-2 text-gray-500" />
        </div>
      </header>

      <Outlet />
    </main>
  );
};

export default MainContent;
