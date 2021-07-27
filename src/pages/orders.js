import { getSession } from "next-auth/client";
import Wrapper from "../components/Wrapper";
import Order from "../components/Order";

import Head from "next/head";

const OrdersPage = ({ session, orders }) => {
  return (
    <Wrapper session={session}>
      <Head>
        <title>Amazon 2.0.0 Orders</title>
      </Head>
      <main className="min-h-screen max-w-screen-lg mx-auto">
        <h1 className="text-3xl mt-4 font-semibold border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order
              key={order.id}
              id={order.id}
              amount={order.amount}
              shippingAmount={order.shippingAmount}
              date={order.createdAt}
              images={order.images}
              items={order.items}
            />
          ))}
        </div>
      </main>
    </Wrapper>
  );
};

export default OrdersPage;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const { connectDb } = require("../lib/db");
  const Orders = require("../models/orders");

  //Get the users logged in credentials...
  const session = await getSession({ req: context.req });

  if (!session) {
    return {};
  }

  try {
    await connectDb();
  } catch (err) {
    return res.status(500).json({ message: "Could not connect to database!" });
  }

  const stripeOrders = await Orders.find({ email: session.user.email }).sort({
    createdAt: -1,
  });

  const orders = await Promise.all(
    stripeOrders.map(async (order) => ({
      id: order.stripeOrderId,
      amount: order.amount,
      shippingAmount: order.shippingAmount,
      images: order.images,
      createdAt: order.createdAt.toISOString(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.stripeOrderId, {
          limit: 100,
        })
      ).data,
    }))
  );

  console.log(orders);
  return {
    props: {
      session,
      orders,
    },
  };
}
