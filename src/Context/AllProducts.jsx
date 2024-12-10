import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react"





export const AllProducts = createContext([])




export default function AllProductsProvider({ children }) {
    const [products, setProducts] = useState([])

    const getProducts = useCallback(async () => {
        try {
            const {data} = await axios.get('http://localhost:3000/products')
            setProducts(data)
        } catch (error) {
            console.log(error);
            
        }
    },[])
   

    useEffect(() => {
        getProducts()
    },[])



    return <AllProducts.Provider value={{products}}>{children}</AllProducts.Provider>
}