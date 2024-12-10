import axios from "axios"
import { createContext, useEffect, useState, useCallback } from "react"
import { toast } from "react-toastify"

export const CartContext = createContext([])

export default function CartContextProvider({ children }) {
    const [carts, setCarts] = useState([])
    const [cartUser, setCartUser] = useState([])
    const [counter, setCounter] = useState(1)


    const getCart = useCallback(async () => {

        try {
            await axios.get('http://localhost:3000/cart')
                .then(response => {
                    setCarts(response.data)
                })
        } catch (err) {
            console.log(err);

        }
    }, [])

    const addToCart = async (item, id) => {
        if (!id) {
            toast.error('يرجى تسجيل الدخول أولا')
            return
        }

        const cart = carts?.find((cart) => cart.userId === id)

        const itemExist = cart?.list.find((cartItem) => cartItem.id === item.id)

        if (!cart) return toast.error('سلة التسوق غير موجودة')

        if (!itemExist) {
            cart.list.push({
                id: item.id,
                itemName: item.name,
                category: item.category,
                price: item.price,
                image: item.image,
                count: counter
            })
            toast.success("تمت إضافة المنتج للسلة")
        } else if (itemExist.count !== counter) {
            itemExist.count = counter
            toast.success("تم تحديث المنتج")
        } else {
            toast.error("تم إضافة المنتج بالفعل")
            return
        }

        try {

            const response = await axios.put(`http://localhost:3000/cart/${cart.id}`, cart)
            setCartUser(response.data)

        } catch (err) {
            toast.error('حدث خطأ أثناء تحديث السلة')
        } finally {
            setCounter(1)
        }
    }


    const deleteFromCart = async (item, id) => {
        const cart = carts.find((cart) => cart.userId === id)
        const itemExist = cart?.list.find((cartItem) => cartItem.id === item.id)

        if (!cart || !itemExist) {
            toast.error("العنصر غير موجود في السلة")
            return
        }

        cart.list.splice(cart.list.indexOf(itemExist), 1)

        try {
            const response = await axios.put(`http://localhost:3000/cart/${cart.id}`, cart)
            setCartUser(response.data)
            toast.success('تم حذف المنتج من السلة')
        } catch (err) {
            toast.error('حدث خطأ أثناء حذف المنتج')
        }
    }


    const handleIncrementAndDecrement = (value) => {
        setCounter((prevCounter) => {
            if (value === "increment") return prevCounter + 1
            if (value === "decrement" && prevCounter > 1) return prevCounter - 1
            return prevCounter
        })
    }

    useEffect(() => {
        getCart()
    }, [])

    return <CartContext.Provider value={{ addToCart, counter, handleIncrementAndDecrement, setCounter, carts, deleteFromCart, getCart, cartUser }}>{children} </CartContext.Provider>

}
