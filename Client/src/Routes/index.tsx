import MainLayout from '../Components/MainLayout';
import Cart from '../Pages/Cart';
import CheckoutPage from '../Pages/Checkout';
import Detailpage from '../Pages/Detail';
import FAQ from '../Pages/FAQ';
import ForgotPassword from '../Pages/ForgotPassword/forgotpassword';
import Home from '../Pages/Home';
import NotFound from '../Pages/NotFound';
import Productspage from '../Pages/Products';
import ResetPassword from '../Pages/ResetPassword';
import SuccessPage from '../Pages/Succes';
import UserPage from '../Pages/User';
import OrderDetailsPage from '../Pages/User/DashboardPages/Orders/orderdet';

const id = ":id";
const token = ":token"
const conversationId = ":conversationId";

export const ROUTES = [
    {
        element: <MainLayout />,
        path: '/',
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'products',
                element: <Productspage />
            },
            {
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: `products/${id}`,
                element: <Detailpage />
            },
            {
                path: `user/${id}/cart`,
                element: <Cart />
            },
            {
                path: `user/${id}`,
                element: <UserPage />
            },
            {
                path: `reset-password/${token}`,
                element: <ResetPassword />
            },
            {
                path: `faq`,
                element: <FAQ />
            },
            {
                path: 'success',  
                element: <SuccessPage />
            },
            {
                path: '*',
                element: <NotFound />
            },
            {
                path: 'checkout',
                element: <CheckoutPage />
            },
            {
                path: `order/${id}`, 
                element: <OrderDetailsPage />  
              }
        ]
    }
];
