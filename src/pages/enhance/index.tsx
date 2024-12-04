// import { useSearchParams } from 'react-router-dom';
import EnhanceTable from './table';
import { TableAction } from './action';
import { Dialog } from './dialog';

export default function TemuanPage() {
  return (
    <div className="max-h-full flex-1 space-y-6 overflow-y-auto p-4 pt-6 md:p-6">
      <div className="mt-6 space-y-4">
        <TableAction />
        <EnhanceTable />
      </div>
      <Dialog />
    </div>
  );
}
