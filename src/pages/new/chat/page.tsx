import {
  ArrowRightIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  ImageIcon,
  MixerHorizontalIcon,
  PersonIcon,
  PlusCircledIcon,
  ReloadIcon
} from '@radix-ui/react-icons';

const ChatPage = () => {
  const promptSuggestions = [
    {
      icon: <PersonIcon className=" text-gray-500" />,
      text: 'Write a to-do list for a personal project or task'
    },
    {
      icon: <EnvelopeClosedIcon className=" text-gray-500" />,
      text: 'Generate an email or reply to a job offer'
    },
    {
      icon: <ChatBubbleIcon className=" text-gray-500" />,
      text: 'Summarise this article or text for me in one paragraph'
    },
    {
      icon: <MixerHorizontalIcon className=" text-gray-500" />,
      text: 'How does AI work in a technical capacity.'
    }
  ];

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center text-left">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-gradient-light text-4xl font-bold">
          Hi there, Marvin
        </h2>
        <h3 className="text-gradient-light mt-2 text-4xl font-bold">
          What would you like to know?
        </h3>
        <p className="mt-6 text-gray-500">
          Use one of the most common prompts below or use your own to begin
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 text-left md:grid-cols-4">
          {promptSuggestions.map((prompt, index) => (
            <div
              key={index}
              className="flex min-h-32 cursor-pointer flex-col items-start rounded-lg border border-gray-200 p-4 hover:bg-gray-50"
            >
              <p className="flex-1 text-sm text-gray-700">{prompt.text}</p>
              {prompt.icon}
            </div>
          ))}
        </div>

        <button className="mt-6 flex text-sm text-gray-600 hover:text-gray-900">
          <ReloadIcon className="mr-2" />
          Refresh prompts
        </button>
      </div>

      <div className="mt-16 w-full rounded-xl border border-gray-300 bg-white p-4">
        <textarea
          className="w-full resize-none border-none text-sm outline-none placeholder:text-gray-400"
          rows={4}
          placeholder="Ask CombipharGPT whatever you want....."
          maxLength={1000}
        />

        <div className="mt-4 flex items-center justify-between text-sm text-gray-800">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1 transition hover:text-purple-600">
              <PlusCircledIcon /> Add attachment
            </button>
            <button className="flex items-center gap-1 transition hover:text-purple-600">
              <ImageIcon /> Use image
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-900">0/1000</span>
            <button className="flex h-8 w-8 items-center justify-center rounded-md bg-[#7051f8] text-white transition hover:bg-[#5b3de4]">
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;
