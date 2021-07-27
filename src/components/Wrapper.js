import { Fragment } from "react"
import Header from "./Header"
import Footer from "./Footer"

const Wrapper = (props) => {
    return (
        <div className="min-h-screen">
            <Header session={props.session} />
            { props.children }
            <Footer />
        </div>
    )
}

export default Wrapper
