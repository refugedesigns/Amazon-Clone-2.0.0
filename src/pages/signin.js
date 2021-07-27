import { getSession } from "next-auth/client"
import { Fragment } from "react"
import Signin from "../components/Signin"
import Head from "next/head"

export default function SigninPage() {

    return (
        <Fragment>
            <Head>
                <title>Amazon 2.0.0 Signin</title>
            </Head>
        <div className="h-screen max-w-screen-2xl mx-auto">
          <Signin />
        </div>
      </Fragment>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req })
    
    if (session) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: { session },
    }
}