import { TableAction } from './action';
import { Dialog } from './dialog';
import EnhanceTable from './table';

const Index = () => {
  return (
    <>
      <div className="mt-4 space-y-4">
        <TableAction />
        <EnhanceTable />
      </div>
      <Dialog />
    </>
  );
};

export default Index;
