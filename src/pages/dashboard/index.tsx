/* eslint-disable react-hooks/exhaustive-deps */
import PageHead from '@/components/shared/page-head';
import { BpkaCard } from '@/pages/dashboard/components/bpka-card';
import { JasaRaharjaCard } from '@/pages/dashboard/components/jasaraharja-card';
import { DitlantasCard } from '@/pages/dashboard/components/ditlantas-card';
import { usePathname, useRouter } from '@/routes/hooks';
import { thousandSeparator } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { BaseCardProps } from '@/types/dashboard';
import { useBreadcrumbStore } from '@/hooks/use-breadcrumb';
import { KabupatenList } from '@/pages/dashboard/components/kabupaten-list';
import React from 'react';
import { LastSync } from './last-sync';
import { ScrollArea } from '@/components/ui/scroll-area';
import { route } from '@/constants/dashboard';

export default function SelectedRegionPage({
  children
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const { setRoutes, routes } = useBreadcrumbStore();

  const splittedPath = path.split('/').slice(1);
  const isKabupaten = splittedPath.length === 1;

  React.useEffect(() => {
    if (isKabupaten && routes.length < 2) {
      setRoutes([route]);
    }
  }, []);

  return (
    <>
      <PageHead title="Combiphar" />
      <ScrollArea className="h-full w-full">
        <div className="h-full space-y-4 p-4 pt-6 md:p-6">
          {isKabupaten ? (
            <>
              <div>
                <div className="grid gap-4 md:grid-cols-3">
                  <BpkaCard />
                  <JasaRaharjaCard />
                  <DitlantasCard />
                </div>
                <LastSync />
                <Separator className="mt-2" />
              </div>
              <KabupatenList />
            </>
          ) : (
            <div className="space-y-4">
              <BackButton />
              <SelectedRegion />
              <Separator />
              {children}
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
}

const BackButton = () => {
  const { push } = useRouter();
  const path = usePathname();
  const backUrl = path.substring(0, path.lastIndexOf('/'));
  return (
    <div
      className="flex w-fit cursor-pointer items-center gap-1 rounded-full bg-gray-400/15 px-3 py-1 text-xs duration-100 ease-in hover:bg-gray-400/20 active:-translate-x-1"
      onClick={() => push(backUrl)}
    >
      <ChevronLeft className="size-4" />
      Kembali
    </div>
  );
};

const SelectedRegion = () => {
  const { routes } = useBreadcrumbStore();

  const currentRegion = routes[routes.length - 1];

  if (!currentRegion) return null;

  const { name, total, sync, jr, dl, jr_dl } = currentRegion;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="font-semibold capitalize">
          {name !== '' ? name.toLowerCase() : 'Belum Terdaftar'}
        </h2>
        <h4 className="space-x-4 text-lg font-semibold">
          <span>
            <span className="text-sm font-normal tracking-tight text-muted-foreground">
              Total &nbsp;
            </span>
            {thousandSeparator(total)}
          </span>
          <span>
            <span className="text-sm font-normal tracking-tight text-muted-foreground">
              Synced &nbsp;
            </span>
            {thousandSeparator(sync)}
          </span>
        </h4>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* <SelectedRegionCard title="Synced" value={sync} /> */}
        <SelectedRegionCard title="BPKA" value={total} />
        <SelectedRegionCard title="Jasa Raharja" value={jr} />
        <SelectedRegionCard title="Ditlantas" value={dl} />
        <SelectedRegionCard title="Jasa Raharja - Ditlantas" value={jr_dl} />
      </div>
    </div>
  );
};

export const SelectedRegionCard = (props: BaseCardProps) => {
  const { title, value } = props;
  return (
    <Card>
      <CardContent className="p-4 px-6">
        <div className="text-lg font-semibold">{thousandSeparator(value)}</div>
        <p className="text-xs text-muted-foreground">{title}</p>
      </CardContent>
    </Card>
  );
};
