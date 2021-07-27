import Image from "next/image"
import Wrapper from "../components/Wrapper"
import CheckoutProduct from "../components/CheckoutProduct"
import Currency from "react-currency-formatter"

import Head from "next/head"

import { useSelector, useDispatch} from "react-redux"
import { getSession } from "next-auth/client"
import { selectItems, emptyBasket, selectTotalQuantity, selectTotalAmount } from "../slices/basketSlice"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY)

const CheckoutPage = ({session}) => {
    const items = useSelector(selectItems)
    const totalQuantity = useSelector(selectTotalQuantity)
    const dispatch = useDispatch()

    const totalAmount = items.reduce((currNumber, item) => {
        return currNumber + item.totalPrice
    }, 0)

    const clearBasketHandler = () => {
        dispatch(emptyBasket())
    }

    const createCheckoutSession = async() => {
        const stripe = await stripePromise;

        const checkoutSession = await fetch("/api/create-checkout-section", {
            method: "POST",
            body: JSON.stringify({
                items,
                totalQuantity,
                totalAmount,
                email: session.user.email
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })

        const stripeSession = await checkoutSession.json()

        //Redirect user/customer to Sripe Checkout
        const result = await stripe.redirectToCheckout({
            sessionId: stripeSession.id
        })

        if (result.error) {
            console.log(result.error.message)
        }
    }
    
    return (
      <Wrapper session={session}>
        <Head>
          <title>Amazon 2.0.0 Checkout</title>
        </Head>
        <main className="min-h-screen lg:flex max-w-screen-2xl mx-auto">
          {/* Left */}
          <div className="flex-grow m-5 shadow-sm">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
            />

            <div className="flex flex-col p-5 space-y-10 bg-white">
              <h1 className="text-3xl border-b pb-4 flex justify-between">
                {items.length > 0
                  ? "Shopping Basket"
                  : "Your Amazon Basket is empty"}{" "}
                {items.length > 0 && (
                  <button
                    className="text-sm button"
                    onClick={clearBasketHandler}
                  >
                    Clear your basket
                  </button>
                )}
              </h1>

              {items.map((item) => (
                <CheckoutProduct
                  key={item.id}
                  id={item.id}
                  quantity={item.quantity}
                  title={item.title}
                  image={item.image}
                  rating={item.rating}
                  description={item.description}
                  hasPrime={item.hasPrime}
                  price={item.price}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          {items.length > 0 && (
            <div className="flex flex-col bg-white p-10 shadow-md">
              <>
                <h2 className="whitespace-nowrap mx-auto">
                  Subtotal ({totalQuantity} items)
                  <span className="font-bold ml-4">
                    <Currency quantity={totalAmount} />
                  </span>
                </h2>

                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`button mt-2 whitespace-nowrap ${
                    !session && "button-light"
                  }`}
                >
                  {!session ? "Sign in to checkout" : "Proceed to checkout"}
                </button>
              </>
            </div>
          )}
        </main>
      </Wrapper>
    );
}

export default CheckoutPage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req })
  
  return {
    props: {
      session
    }
  }

}