import { getSession } from "next-auth/client"
import Signup from "../components/Signup"
import Head from "next/head"
import { Fragment } from "react"

const SignupPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Amazon 2.0.0 Signup</title>
      </Head>
      <div className="h-screen max-w-screen-2xl mx-auto">
        <Signup />
      </div>
    </Fragment>
  );
}

export default SignupPage

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
    }
    
    return {
        props: { session }
    }
}