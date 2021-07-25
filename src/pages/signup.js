import { getSession } from "next-auth/client"
import Signup from "../components/Signup"

const SignupPage = () => {
    return (
        <div className="h-screen max-w-screen-2xl mx-auto">
            <Signup />
        </div>
    )
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