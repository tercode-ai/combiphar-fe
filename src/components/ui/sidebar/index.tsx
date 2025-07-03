import {
  ArrowTopRightIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  PlusIcon,
  TimerIcon
} from '@radix-ui/react-icons';
import { Link, useLocation } from 'react-router-dom';
import { useGetFiles } from './_hook/use-get-history-chat';
import { SessionToken } from '@/lib/cookies';

type TRecentChats = {
  session_id: string;
  title: string;
};

const Sidebar = () => {
  const query = useGetFiles();

  const dataResult = query.data?.data as TRecentChats[] | undefined;
  const location = useLocation();

  const handleLogout = () => {
    SessionToken.remove();
    window.location.href = '/auth/signin';
  };

  return (
    <aside className="flex w-[296px] flex-col gap-2 bg-[#D2D2D2] p-6">
      <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-gray-400/20">
        <HamburgerMenuIcon className="h-4 text-gray-800" />
      </button>

      <Link
        to="/new/chat"
        className="mt-4 flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-gray-400/20"
      >
        <PlusIcon className="text-gray-800" />
        <span className="text-gradient-primary font-semibold ">New Chat</span>
      </Link>

      <Link
        to="/new/files"
        className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-400/20"
      >
        <div className="flex items-center gap-2">
          <FileTextIcon className="font-bold" />
          <span className="truncate font-semibold">Document File</span>
        </div>
      </Link>

      <div className="mt-6 flex-grow overflow-y-auto">
        <h2 className="mb-2 p-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Recent Chat
        </h2>
        <nav>
          <ul>
            {Array.isArray(dataResult) && dataResult.length > 0 ? (
              dataResult.map((chat: TRecentChats) => (
                <li key={chat.session_id}>
                  <Link
                    to={`/new/chat/${chat.session_id}`}
                    className={`flex items-center justify-between rounded-lg p-2 text-sm hover:bg-gray-400/20
                      ${location.pathname === `/new/chat/${chat.session_id}` ? 'bg-gray-400/40 text-black' : 'text-gray-700'}
                    `}
                  >
                    <span className="truncate font-semibold">
                      {chat.title || 'Untitled Chat'}
                    </span>
                    <div className="rounded-sm bg-[#C4C4C4] p-[2px] text-gray-900">
                      <ArrowTopRightIcon className="h-4" />
                    </div>
                  </Link>
                </li>
              ))
            ) : (
              <li className="p-2 text-sm text-gray-500">No recent chats</li>
            )}
          </ul>
        </nav>
      </div>

      <div className="mt-auto">
        <a
          href="#"
          className="flex items-center rounded-lg p-2 text-sm text-gray-600 hover:bg-neutral-300/60"
        >
          <TimerIcon className="mr-3 text-lg" />
          <span>See Full Chat History</span>
        </a>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="mt-4 flex w-full items-center gap-3 rounded-lg bg-slate-400 p-3 text-sm text-blue-600 hover:bg-[#E0E0E0] "
          >
            <span className="w-full text-center font-semibold">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
