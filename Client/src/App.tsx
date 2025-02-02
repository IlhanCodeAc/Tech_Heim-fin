import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from './Routes'; // Your routes file
import { SidebarProvider } from './Components/components/ui/sidebar'; // Sidebar context
import { Sidebar } from './Components/components/ui/sidebar'; // Existing Sidebar component

const routes = createBrowserRouter(ROUTES);

const App = () => {
  return (
      <div >
          <RouterProvider router={routes} />
      </div>
  );
};

export default App;
