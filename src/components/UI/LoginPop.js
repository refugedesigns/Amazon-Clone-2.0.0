

const LoginPop = () => {
    return (
        <div className="absolute top-12 right- w-38 h-24 flex flex-col p-4 bg-white space-y-2">
            <button className="button text-gray-800 text-xs font-semibold">Sign in</button>
            <p className="text-gray-600 text-xs">New customer? <span className="text-blue-600 cursor-pointer hover:underline hover:text-yellow-500">Start here</span></p>
        </div>
    )
}

export default LoginPop
