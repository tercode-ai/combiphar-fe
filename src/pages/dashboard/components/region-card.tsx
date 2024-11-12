import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useBreadcrumbStore } from '@/hooks/use-breadcrumb';
import { cn, thousandSeparator } from '@/lib/utils';
import { useRouter } from '@/routes/hooks';
import { BaseCardProps, RegionCardProps } from '@/types/dashboard';

export const RegionCard = (props: RegionCardProps) => {
  const { data, routeOnClick } = props;

  const { addRoute } = useBreadcrumbStore();

  const { push } = useRouter();
  const handleClick = () => {
    if (data.id === '') return;
    addRoute(data);
    push(routeOnClick);
  };
  return (
    <Card
      className={cn(
        data.id !== '' &&
          'cursor-pointer duration-150 ease-in-out hover:shadow-md'
      )}
      onClick={handleClick}
    >
      <CardContent className="pb-4 pt-4">
        <div className="flex flex-row items-center justify-between space-y-0">
          <h3 className="text-sm font-semibold capitalize">
            {data.name !== '' ? data.name.toLowerCase() : 'Belum Terdaftar'}
          </h3>
        </div>
        <Separator className="my-2" />
        <div className="mb-2 flex items-center justify-between">
          <div className="text-xs">Jumlah Kendaraan</div>
          <div className="text-sm font-bold">
            {thousandSeparator(data.total)}
          </div>
        </div>
        <RegionDetailRow title="Synced" value={data.sync} />
        <RegionDetailRow title="BPKA" value={data.total} />
        <RegionDetailRow title="Jasa Raharja" value={data.jr} />
        <RegionDetailRow title="Ditlantas" value={data.dl} />
        <RegionDetailRow title="Jasa Raharja - Ditlantas" value={data.jr_dl} />
      </CardContent>
    </Card>
  );
};

const RegionDetailRow = (props: BaseCardProps) => {
  const { title, value } = props;

  return (
    <div className="flex justify-between">
      <div className="text-xs tracking-tight">{title}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
};
