import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
        <div className="rounded-xl bg-gray-200 px-4 py-2 text-sm text-gray-900">
          {question}
        </div>
      </div>
      <div className="flex items-start space-x-3">
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="prose prose-sm max-w-full space-y-4 break-words text-justify"
          >
            {answer}
          </ReactMarkdown>
          {/* <Markdown >{answer}</Markdown> */}
        </div>
      </div>
    </div>
  );
};
