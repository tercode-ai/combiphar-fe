export const ChatItem = ({
  question,
  answer
}: {
  question: string;
  answer: string;
}) => {
  return (
    <div className="mb-10 space-y-4">
      <div className="flex justify-end">
        <div className="max-w-xl rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-900">
          {question}
        </div>
      </div>
      <div className="flex max-w-4xl items-start space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-white shadow">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-gray-200 bg-white">
            <img src="/icons/logo-short.png" />
          </div>
        </div>
        <div className="rounded-lg bg-[#f4f4f5] px-4 py-2 text-sm leading-relaxed text-gray-800">
          {answer}
        </div>
      </div>
    </div>
  );
};
