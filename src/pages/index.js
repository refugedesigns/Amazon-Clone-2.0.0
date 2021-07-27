import { Fragment } from "react"
import { getSession } from "next-auth/client";

import Head from "next/head"
import Banner from "../components/Banner"
import ProductFeed from "../components/ProductFeed"
import Wrapper from "../components/Wrapper"

export default function Home({products, session}) {
  return (
    <Wrapper session={session}>
      <Head>
        <title>Amazon 2.0.0</title>
      </Head>
      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        
        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>

    </Wrapper>
  );
}


export async function getServerSideProps(context) {
 
 const session = await getSession({req: context.req})
 const response = await fetch("https://fakestoreapi.com/products")
 const products = await response.json() 


  return {
    props: {
      products: products,
      session
    }
  }
}