import Image from "next/image"
import { StarIcon } from "@heroicons/react/solid"
import Currency from "react-currency-formatter"
import { addToBasket, removeFromBasket, deleteFromBasket } from "../slices/basketSlice"
import { useDispatch } from "react-redux"

const CheckoutProduct = ({id,quantity, title, price, rating, description, image, hasPrime}) => {
    const dispatch = useDispatch()

    const decreaseItemHandler = () => {
        dispatch(removeFromBasket(id))
    }

    const increaseItemHandler = () => {
        dispatch(addToBasket({
            id,
            title,
            price,
            image,
            rating,
            description,
            hasPrime
        }))
    }

    const deleteFromBasketHandler = () => {
        dispatch(deleteFromBasket(id))
    }

    return (
        <div className="flex flex-col xl:grid grid-cols-5 my-auto">
            <Image src={image} height={200} width={200} objectFit="contain" />
        
            <div className="col-span-3 mx-5">
                <p>{title}</p>
                <div className="flex">
                    {Array(rating).fill().map((_, i) => (
                        <StarIcon key={i} className="h-5 text-yellow-500" />
                    ))}
                </div>

                <p className="text-xs my-2 line-clamp-3">{description}</p>
                <Currency quantity={price} />

                {hasPrime && (
                    <div className="flex items-center space-x-2">
                        <img loading="lazy" className="w-12" src="https://links.papareact.com/fdw" alt="" />
                        <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
                    </div>
                )}
            </div>
            <div className="space-y-4 flex flex-col mx-auto w-full max-w-md p-3">
                <div className="flex items-center justify-center space-x-4">
                <button className="text-xs text-center button whitespace-nowrap" onClick={decreaseItemHandler}>-Decrease</button>
                <p>{quantity}</p>
                <button className="text-xs text-center button whitespace-nowrap" onClick={increaseItemHandler}>+Increase</button>
            </div>
                <button className="button text-xs whitespace-nowrap" onClick={deleteFromBasketHandler}>Remove from Basket</button>
            </div>
        </div>
    )
}

export default CheckoutProduct
