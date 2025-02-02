import MainLayout from '../Components/MainLayout';
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
            path:'/products',
            element: <Productspage/>
        },
        
        // {
        //     path:'Login',
        //     element:<Login/>
        // },
        // {
        //     path:'register',
        //     element:<Register/>
        // }
     ]
    }
];