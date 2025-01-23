import { createBrowserRouter , RouterProvider } from 'react-router-dom'
import { ROUTES } from './Routes';
const routes =createBrowserRouter(ROUTES);


const App = () => {
  return (
    <>
   <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App