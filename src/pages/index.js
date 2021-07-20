import Head from "next/head"
import Header from "../components/Header"
import Banner from "../components/Banner"
import ProductFeed from "../components/ProductFeed"

export default function Home({products}) {
  return (
    <div>
      <Head>
        <title>Amazon 2.0.0</title>
      </Head>
      
      {/* Header */}

      <Header />

      <main className="max-w-screen-2xl mx-auto">
        {/* Banner */}
        <Banner />
        
        {/* ProductFeed */}
        <ProductFeed products={products} />
      </main>

    </div>
  );
}


export async function getStaticProps() {

 const response = await fetch("https://fakestoreapi.com/products")
 const products = await response.json() 


  return {
    props: {
      products: products
    }
  }
}