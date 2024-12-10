import axios from "axios";
import { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";


export const WishListContext = createContext([])



export default function WishListProvider({ children }) {
    const [wishList, setWishList] = useState([])
    const [userWish, setUserWish] = useState([])



    const getWishList = useCallback(async () => {
        await axios.get('http://localhost:3000/wishlist')
            .then(response => {
                setWishList(response.data)
            })
            .catch(error => {
                console.log(error);
            })
    },[])



    async function handleWishList(item, id) {
        if (id) {
            const wish = wishList.find((wish) => wish.userId === id)
            const itemExist = wish?.list.find((wish) => wish?.id === item.id)

            if (itemExist === undefined) {
                wish?.list.push({
                    id: item.id,
                    itemName: item.name,
                    category: item.category,
                    price: item.price,
                    image: item.image,
                })

                toast.success("تمت اضافة المنتج للمفضلة")

            } else {
                wish?.list.splice(wish?.list.indexOf(itemExist), 1)
                toast.error("تم الحذف من المفضلة")

            }

            await axios.put(`http://localhost:3000/wishlist/${wish.id}`, wish)
            .then(response => {
              setUserWish(response.data)  
            })
        } else {
            toast.error("يرجى تسجيل الدخول")
        }
    }






    useEffect(() => {
        getWishList()
    }, [])



    return <WishListContext.Provider value={{ handleWishList, wishList, getWishList }}>{children}</WishListContext.Provider>
}