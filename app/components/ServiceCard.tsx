import Link from "next/link"

type props = {
    title: string,
    url: string
}

const ServiceCard = ({ title, url }: props) => {
    return (
        <Link className="w-44 rounded-2xl aspect-square bg-gray-600 hover:bg-gray-800 transition-all duration-300 cursor-pointer flex justify-center items-center text-center p-2" href={`/services?service=${url}`}>
            <h1 className="text-xl font-semibold">{title}</h1>
        </Link>
    )
}

export default ServiceCard