import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { lazy, Suspense } from 'react';

const PromptEnhancement = lazy(() => import('./pre-postfix'));
const ChatGreeting = lazy(() => import('./intro'));

export default function TemuanPage() {
  return (
    <div className="max-h-full flex-1 space-y-6 overflow-y-auto p-4 pt-6 md:p-6">
      <Tabs defaultValue="prompt">
        <TabsList>
          <TabsTrigger value="prompt">Prompt Configuration</TabsTrigger>
          <TabsTrigger value="intro">Chat Greeting</TabsTrigger>
        </TabsList>
        <TabsContent value="prompt">
          <Suspense fallback="Failed to load component">
            <PromptEnhancement />
          </Suspense>
        </TabsContent>
        <TabsContent value="intro">
          <Suspense fallback="Failed to load component">
            <ChatGreeting />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
