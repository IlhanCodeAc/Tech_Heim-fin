import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './Routes'; // Your routes file
import { SidebarProvider } from './Components/components/ui/sidebar'; // Sidebar context
import { Sidebar } from './Components/components/ui/sidebar'; // Existing Sidebar component
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
