'use client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '../ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

export interface ProvidersProps {
  children: React.ReactNode;
  // themeProps?: ThemeProviderProps;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <TooltipProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster richColors position="top-center" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </TooltipProvider>
  );
}
