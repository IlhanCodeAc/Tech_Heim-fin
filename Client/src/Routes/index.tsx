import MainLayout from '../Components/MainLayout';
import Cart from '../Pages/Cart';
import Detailpage from '../Pages/Detail';
import FAQ from '../Pages/FAQ';
import ForgotPassword from '../Pages/ForgotPassword/forgotpassword';
import Home from '../Pages/Home';
import Productspage from '../Pages/Products';
import ResetPassword from '../Pages/ResetPassword';
import UserPage from '../Pages/User';

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
        ]
    }
];
