import Image from 'next/image'


const Footer = () => {
    return (
        <footer className="bg-amazon_blue h-36">
            <div className="flex justify-center items-center h-full">
            <Image src="https://links.papareact.com/f90" width={200} height={50} objectFit="contain" />
            </div>
        </footer>
    )
}

export default Footer
