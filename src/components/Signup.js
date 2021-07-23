import { Fragment } from "react"
import { useRouter } from "next/dist/client/router"
import Image from "next/image"
import Head from "next/head"
import AmazonBlack from "../assets/amazonblack.png"

const Signup = () => {

    const router = useRouter()


    return (
        <Fragment>
        <Head>
            <title>Amazon 2.0.0 Signup</title>
        </Head>
        <div className="mx-auto w-min flex flex-col mt-4">
        <Image  src={AmazonBlack} width={150} height={40} objectFit="contain" className="cursor-pointer" onClick={() => router.push("/")} />
            <div className="flex flex-col border border-gray-300 rounded-md mt-4 p-8 space-y-6">

                <h2 className="text-3xl font-semibold text-gray-800">Create account</h2>
                
                <div className="space-y-4">
                <div>
                    <label className="text-sm font-semibold text-gray-800" htmlFor="name">Your name</label>
                    <input className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500" type="text" id="name" />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-800" htmlFor="email">Email</label>
                    <input className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500" type="email" id="email" />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-800 flex justify-between" htmlFor="password">Password</label>
                    <input className="w-80 p-1 my-1 border rounded-sm placeholder-italic focus:outline-none focus:ring-1 focus:ring-yellow-500" type="password" id="passowrd" placeholder="At least 6 charactors" />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-800 flex justify-between" htmlFor="password">Re-enter password</label>
                    <input className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500" type="password" id="passowrd" />
                </div>
                </div>

                <button className="button">Sign-In</button>

                <p className="text-xs text-gray-800">By creating an account, you agree to Amazon's <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">Conditions of Use</span> and <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500" >Privacy Notice.</span></p>

                <hr />

                <p className="text-xs text-gray-800">Already have an account?<span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500" onClick={() => router.push("/signin")}> Sign in </span></p>
            </div>
        </div>  
        <hr className="mt-8 border-gray-300" />      
        </Fragment>
        
    )
}

export default Signup

