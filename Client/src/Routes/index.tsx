import MainLayout from '../Components/MainLayout';
import Detailpage from '../Pages/Detail';
import Home from '../Pages/Home';
import Productspage from '../Pages/Products';
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
            path:'products/detail',
            element:<Detailpage/>
        },
        // {
        //     path:'register',
        //     element:<Register/>
        // }
     ]
    }
];