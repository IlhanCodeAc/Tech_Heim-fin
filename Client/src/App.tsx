import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './Routes'; 
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './config/queryClient';

const routes = createBrowserRouter(ROUTES);

const App = () => {
  return (
      <div >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={routes} />
          </QueryClientProvider>
      </div>
  );
};

export default App;
