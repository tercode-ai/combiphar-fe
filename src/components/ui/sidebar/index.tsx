import {
  ArrowTopRightIcon,
  FileTextIcon,
  HamburgerMenuIcon,
  PlusIcon,
  TimerIcon
} from '@radix-ui/react-icons';

const recentChats = [
  'What is AI',
  '2D Animation Pet Nap',
  'DALL-E Image Generation',
  'Crate 3D Icon',
  'Simple Cashier in Go',
  'Yahoo Conversation',
  'Summarize My Request',
  'Random Request Response',
  'Road Trip Playlist Ideas',
  'Analisis Timnas Indonesia'
];

const Sidebar = () => {
  return (
    <aside className="flex w-[296px] flex-col gap-2 bg-neutral-200/50 p-6">
      <button className="flex h-8 w-8 items-center justify-center rounded-lg hover:bg-neutral-300/60">
        <HamburgerMenuIcon className="h-4 text-gray-800" />
      </button>

      <button className="mt-4 flex w-full items-center gap-2 rounded-lg p-2 text-left hover:bg-neutral-300/60">
        <PlusIcon className="text-gray-800" />
        <span className="text-gradient-primary font-semibold ">New Chat</span>
      </button>

      <a
        href="#"
        className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-600 hover:bg-neutral-300/60"
      >
        <div className="flex items-center gap-2">
          <FileTextIcon className="font-bold" />
          <span className="truncate font-semibold">Document File</span>
        </div>
        <div className="rounded-sm bg-gray-300 p-[2px] text-gray-900">
          <span>12</span>
        </div>
      </a>

      <div className="mt-6 flex-grow overflow-y-auto">
        <h2 className="mb-2 p-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Recent Chat
        </h2>
        <nav>
          <ul>
            {recentChats.map((chat, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center justify-between rounded-lg p-2 text-sm text-gray-600 hover:bg-neutral-300/60"
                >
                  <span className="truncate font-semibold">{chat}</span>
                  <div className="rounded-sm bg-gray-300 p-[2px] text-gray-900">
                    <ArrowTopRightIcon className="h-4" />
                  </div>
                </a>
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
