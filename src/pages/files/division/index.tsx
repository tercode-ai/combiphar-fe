import { LoaderCircle } from '@/components/shared/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Suspense } from 'react';

const DivisionFile = () => {
  return (
    <div className="max-h-full flex-1 space-y-6 overflow-y-auto p-4 pt-6 md:p-6">
      <Tabs defaultValue="it">
        <TabsList>
          <TabsTrigger value="it">IT</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
          <TabsTrigger value="legal">Legal</TabsTrigger>
          <TabsTrigger value="hr">HR</TabsTrigger>
        </TabsList>
        <TabsContent value="it">
          <Suspense fallback={<LoaderCircle />}>IT Files</Suspense>
        </TabsContent>
        <TabsContent value="marketing">
          <Suspense fallback={<LoaderCircle />}>Markeing Files</Suspense>
        </TabsContent>
        <TabsContent value="legal">
          <Suspense fallback={<LoaderCircle />}>Markeing Files</Suspense>
        </TabsContent>
        <TabsContent value="hr">
          <Suspense fallback={<LoaderCircle />}>HR Files</Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DivisionFile;
