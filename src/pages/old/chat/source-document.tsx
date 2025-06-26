import { SourceDocument } from '@/types/chat';

export const RenderSourceDoc = ({ sources }: { sources: SourceDocument[] }) => {
  return (
    <div className="mt-2">
      <h2 className="text-[13px] text-gray-400">Referensi:</h2>
      {sources.map((source, idx) => (
        <p key={idx}>
          {
            source.metadata.source.split('/')[
              source.metadata.source.split('/').length - 1
            ]
          }
          <span className="ml-2 text-xs text-gray-500">
            Halaman {source.metadata.page}
          </span>
        </p>
      ))}
    </div>
  );
};
