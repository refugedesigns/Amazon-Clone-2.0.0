import { getSession } from "next-auth/client"

import Signin from "../components/Signin"

export default function SigninPage() {

    return (
        <div className="h-screen max-w-screen-2xl mx-auto">
            <Signin />
        </div>
    )
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