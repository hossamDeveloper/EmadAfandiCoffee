import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound';
import MyAccount from './Components/MyAccount/MyAccount';
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import AllProductsProvider from './Context/AllProducts'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import About from './Components/About/About'
import Blogs from './Components/Blogs/Blogs'
import ExchangeAndReturnPolicy from './Components/ImportantPages/ExchangeAndReturnPolicy'
import PrivacyPolicy from './Components/ImportantPages/PrivacyPolicy'
import TermsAndConditions from './Components/ImportantPages/TermsAndConditions'
import WishListProvider from './Context/WishList'
import WishPage from './Components/WishPage/WishPage'
import CartContextProvider from './Context/CartContext'
import Cart from './Components/Cart/Cart'
import CheckOut from './Components/CheckOut/CheckOut';
import OrderContextProvider from './Context/OrderContext'
import Profile from './Components/Profile/Profile';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
          
        },
        {
          path: '/products',
          element: <Products />
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/blogs',
          element: <Blogs />
        },
        {
          path: '/profile',
          element: <Profile />
        },
        {
          path: '/exchangeAndReturnPolicy',
          element: <ExchangeAndReturnPolicy />
        },
        {
          path: '/privacyPolicy',
          element: <PrivacyPolicy />
        },
        {
          path: '/termsAndConditions',
          element: <TermsAndConditions />
        },
        {
          path: "/product-details/:id",
          element: <ProductDetails />
        },
        {
          path: "/wishpage",
          element: <ProtectedRoute><WishPage /></ProtectedRoute>
        },
        {
          path: "/cart",
          element: <ProtectedRoute> <Cart /></ProtectedRoute>
        },
        {
          path: "/checkout",
          element: <ProtectedRoute> <CheckOut /></ProtectedRoute>
        },
        {
          path: '/myAccount',
          element: <ProtectedRoute> <MyAccount /></ProtectedRoute>
        },
        {
          path: '*',
          element: <NotFound />
        },
      ]
    }
  ])
  return (
    <>

      <AuthContextProvider>
        <AllProductsProvider>
          <CartContextProvider>
            <WishListProvider>
              <OrderContextProvider>
                <RouterProvider router={router} />
              </OrderContextProvider>
            </WishListProvider>
          </CartContextProvider>
        </AllProductsProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
