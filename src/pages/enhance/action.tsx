import TableSearchInput from '@/components/shared/table-search-input';

export function TableAction() {
  return (
    <div className="mb-4 flex flex-1 flex-col items-center gap-2 sm:flex-row">
      <TableSearchInput placeholder="Search data...." />
    </div>
  );
}
