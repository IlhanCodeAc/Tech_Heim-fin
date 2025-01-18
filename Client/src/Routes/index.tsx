import MainLayout from '../Components/MainLayout';
import Home from '../Pages/Home';
export const ROUTES =[
    {
    element: <MainLayout/>,
     path : '/',
     children:[
        {
            index:true,
            element:<Home/>
        },
        // {
        //     path:'*',
        //     element: <Notfound/>
        // },
        
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