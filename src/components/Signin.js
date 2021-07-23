import { Fragment } from "react"
import Image from "next/image"
import { useRouter } from "next/dist/client/router"
import AmazonBlack from "../assets/amazonblack.png"

const Signin = () => {
    const router = useRouter()
    return (
        <Fragment>
        <div className="mx-auto w-min flex flex-col mt-4">
        <Image  src={AmazonBlack} width={150} height={40} objectFit="contain" className="cursor-pointer" onClick={() => router.push("/")} />
            <div className="flex flex-col border border-gray-300 rounded-md mt-4 p-8 space-y-6">

                <h2 className="text-3xl font-semibold text-gray-800">Sign-In</h2>
                
                <div className="space-y-4">
                <div>
                    <label className="text-sm font-semibold text-gray-800" htmlFor="email">Email</label>
                    <input className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500" type="email" id="email" />
                </div>
                <div>
                    <label className="text-sm font-semibold text-gray-800 flex justify-between" htmlFor="password">Password <span className="text-blue-600 hover:underline cursor-pointer">Forgot your password?</span></label>
                    <input className="w-80 p-1 my-1 border rounded-sm focus:outline-none focus:ring-1 focus:ring-yellow-500" type="password" id="passowrd" />
                </div>
                </div>

                <p className="text-xs text-gray-800">By continuing, you agree to Amazon's <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">Conditions of Use</span> and <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500" >Privacy Notice.</span></p>

                <button className="button">Sign-In</button>
            </div>

            <div className="flex flex-col mt-8 space-y-4">
                <div className="flex items-center justify-center space-x-1">
                    <hr className="w-32"/>
                    <p className="text-xs text-gray-500">New to Amazon?</p>
                    <hr className="w-32"/>
                </div>
                <button className="button-light" onClick={() => router.push("/signup")}>Create your Account</button>
            </div>
        </div>  
        <hr className="mt-8 border-gray-300" />      
        </Fragment>
        
    )
}

export default Signin
