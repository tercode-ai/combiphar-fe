// import { useSearchParams } from 'react-router-dom';
import EnhanceTable from './table';
import { TableAction } from './action';

export default function TemuanPage() {
  return (
    <div className="max-h-full flex-1 space-y-6 overflow-y-auto p-4 pt-6 md:p-6">
      <div className="space-y-4">
        <TableAction />
        <EnhanceTable />
      </div>
    </div>
  );
}
