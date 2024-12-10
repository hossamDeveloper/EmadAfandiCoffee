import React, { useContext, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';

export default function ProtectedRoute({ children }) {
    const { userDetails } = useContext(AuthContext)
    const { carts } = useContext(CartContext)
    const cart = carts.find((cart) => cart.userId === userDetails.id)
    const userIsLogin = localStorage.getItem("userIsLogin");
    const location = useLocation()

    if (location.pathname === "/checkout" && (!cart || cart?.list.length === 0)) {
        <Navigate to={"/products"} replace />

    }

    if (userIsLogin === null && (location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/wishpage" || location.pathname === "/orders")) {
        return <Navigate to={"/myAccount"} replace />
    }

    else if (userIsLogin === "true" && location.pathname === "/myAccount") {
        return <Navigate to={"/"} replace />
    }





    return children;
}
