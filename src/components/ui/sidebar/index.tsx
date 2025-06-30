import {
  ArrowTopRightIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  PlusIcon,
  TimerIcon
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { useGetFiles } from './_hook/use-get-history-chat';

type TRecentChats = {
  id: string;
  title: string;
};

const Sidebar = () => {
  const query = useGetFiles({
    session_id: '123e4567-e89b-12d3-a456-426614174000'
  });
  const dataResult = Array.isArray(query.data?.data) ? query.data?.data : [];

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
            {dataResult.map((chat: TRecentChats, index) => (
              <li key={index}>
                <Link
                  to={`/new/chat/${chat[0]}`}
                  className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-700 hover:bg-gray-400/20"
                >
                  <span className="truncate font-semibold">{chat?.[2]}</span>
                  <div className="rounded-sm bg-[#C4C4C4] p-[2px] text-gray-900">
                    <ArrowTopRightIcon className="h-4" />
                  </div>
                </Link>
              </li>
            ))}
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
      </div>
    </aside>
  );
};

export default Sidebar;
