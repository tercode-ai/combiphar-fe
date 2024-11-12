import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './theme-provider';
import { SidebarProvider } from '@/hooks/use-sidebar';
import { AuthProvider } from './auth-provider';
import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/client';

// const ErrorFallback = ({ error }: FallbackProps) => {
//   const router = useRouter();
//   return (
//     <div
//       className="flex h-screen w-screen flex-col items-center  justify-center text-red-500"
//       role="alert"
//     >
//       <h2 className="text-2xl font-semibold">
//         Ooops, something went wrong :({' '}
//       </h2>
//       <pre className="text-2xl font-bold">{error.message}</pre>
//       <pre>{error.stack}</pre>
//       <Button className="mt-4" onClick={() => router.back()}>
//         Go back
//       </Button>
//     </div>
//   );
// };

export default function AppProvider({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <AuthProvider>
        <HelmetProvider>
          <BrowserRouter>
            {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <SidebarProvider>{children}</SidebarProvider>
              </ThemeProvider>
              <Toaster />
            </QueryClientProvider>
            {/* </ErrorBoundary> */}
          </BrowserRouter>
        </HelmetProvider>
      </AuthProvider>
    </Suspense>
  );
}
