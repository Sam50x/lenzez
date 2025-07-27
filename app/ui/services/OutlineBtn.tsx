import { ReactNode } from "react"

type props = {
    children?: ReactNode
}

const OutlineBtn = ({ children }: props) => {
    return (
        <button className="border-primary border-6 rounded-lg py-3 px-6 cursor-pointer text-center hover:bg-primary hover:text-background text-text duration-300">
            {children}
        </button>
    )
}

export default OutlineBtn