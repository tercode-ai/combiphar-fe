import { BaseSelect } from '@/components/shared/base-select';
import { DatepickerRange } from '@/components/shared/datepicker';
import TableSearchInput from '@/components/shared/table-search-input';
import { useDateRangeParams } from '@/hooks/use-daterange';
import { useSearchParams } from 'react-router-dom';

const sourceOptions = [
  {
    value: 'jasa_raharja',
    label: 'Jasa Raharja'
  },
  {
    value: 'dit_lantas',
    label: 'Ditlantas'
  }
];

export function TemuanTableAction() {
  const [searchParams, setSearchParams] = useSearchParams();

  const source = searchParams.get('source') ?? '';

  const handleSource = (value: string) => {
    const params = Object.fromEntries(searchParams);

    if (value === '') {
      delete params.source;
    } else {
      params.source = value;
    }

    setSearchParams(params);
  };

  const [dateRange, setDateRange] = useDateRangeParams();

  return (
    <div className="mb-4 flex flex-1 flex-col items-center gap-2 sm:flex-row">
      <TableSearchInput placeholder="Cari nomor polisi ..." />
      <div className="w-full sm:w-fit">
        <BaseSelect
          placeholder="Source"
          options={sourceOptions}
          value={source}
          onChange={handleSource}
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
