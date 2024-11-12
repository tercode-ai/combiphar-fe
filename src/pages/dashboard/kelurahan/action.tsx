import { BaseSelect } from '@/components/shared/base-select';
import { DatepickerRange } from '@/components/shared/datepicker';
import TableSearchInput from '@/components/shared/table-search-input';
import { useDateRangeParams } from '@/hooks/use-daterange';
import { useSearchParams } from 'react-router-dom';

const statusOptions = [
  {
    value: 'bpka',
    label: 'BPKA'
  },
  {
    value: 'jr',
    label: 'Jasa Raharja'
  },
  {
    value: 'bpka_jr',
    label: 'BPKA - Jasa Raharja'
  }
];

export function RanmorTableAction() {
  const [searchParams, setSearchParams] = useSearchParams();

  const status = searchParams.get('status') ?? '';

  const handleStatus = (value: string) => {
    const params = Object.fromEntries(searchParams);

    if (value === '') {
      delete params.status;
    } else {
      params.status = value;
    }

    setSearchParams(params);
  };

  const [dateRange, setDateRange] = useDateRangeParams();

  return (
    <div className="mb-4 flex flex-1 flex-col items-center gap-2 sm:flex-row">
      <TableSearchInput placeholder="Cari nomor polisi ..." />
      <div className="w-full sm:w-fit">
        <BaseSelect
          placeholder="Status"
          options={statusOptions}
          value={status}
          onChange={handleStatus}
        />
      </div>
      <div className="w-full sm:w-fit">
        <DatepickerRange
          value={dateRange}
          onSelect={setDateRange}
          placeholder="Filter tanggal sync"
        />
      </div>
    </div>
  );
}
