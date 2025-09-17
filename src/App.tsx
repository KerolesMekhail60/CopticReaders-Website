import { RouterProvider } from 'react-router-dom';
import { toast } from 'sonner';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import useLocalizeDocumentAttributes from './i18n/useLocalizeDocumentAttributes';
import { router } from './routes';

const handleError = (error: Error) => {
  if (error.message?.includes('401')) {
    window.location.href = '/signin';
    return;
  }

  if (error.message?.includes('500')) {
    toast.error('Oops! Something went wrong. Please try again later.');
    return;
  }

  toast.error(error.message);
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000,
      retry: 0,
    },
  },
  queryCache: new QueryCache({
    onError: handleError,
  }),
  mutationCache: new MutationCache({
    onError: handleError,
  }),
});

function App() {
  useLocalizeDocumentAttributes();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
