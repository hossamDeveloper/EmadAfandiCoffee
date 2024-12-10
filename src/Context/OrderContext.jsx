import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";

export const OrderContext = createContext([])



export default function OrderContextProvider({ children }) {
    const [orderContainer, setOrderContainer] = useState([])



    const getOrders = useCallback(() => {
        axios.get('http://localhost:3000/ordersUsers')
            .then(response => {
                setOrderContainer(response.data)
            })
    }, [])




    useEffect(() => {
        getOrders()
    }, [])



    return <OrderContext.Provider value={{ orderContainer }}>{children}</OrderContext.Provider>
}