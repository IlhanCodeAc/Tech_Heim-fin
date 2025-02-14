import MainLayout from '../Components/MainLayout';
import Cart from '../Pages/Cart';
import Detailpage from '../Pages/Detail';
import Home from '../Pages/Home';
import Productspage from '../Pages/Products';
import UserPage from '../Pages/User';
const id = ":id"
export const ROUTES =[
    {
    element: <MainLayout/>,
     path : '/',
     children:[
        {
            index:true,
            element:<Home/>
        },
        {
            path:'products',
            element: <Productspage/>
        },
        
        {
            path:`products/${id}`,
            element:<Detailpage/>
        },
        {
            path:`user/${id}/cart`,
            element:<Cart/>
        },
        {
            path:`user/${id}`,
            element:<UserPage/>
        }
     ]
    }
];