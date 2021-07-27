import Wrapper from "../components/Wrapper";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router"
import { emptyBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react"

const SuccessPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    
    useEffect(() => {
        window.addEventListener("load", () => {
            dispatch(emptyBasket())
        })
    }, [])
    return (
    <Wrapper>
      <main className="min-h-screen max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1 className="text-3xl">
              Thank you, your order has been confirmed!
            </h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has been shipped, if you would like to check the status of your
            order(s) please press the link below.
            </p>
            <button className="button mt-8" onClick={() => router.push("/orders")}>Go to my orders</button>
        </div>
      </main>
    </Wrapper>
  );
};

export default SuccessPage;
