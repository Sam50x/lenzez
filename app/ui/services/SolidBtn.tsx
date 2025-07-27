type props = {
    title: string,
}

const SolidBtn = ({ title }: props) => {
    return (
        <button className="bg-primary text-background rounded-lg py-3 px-6 cursor-pointer text-center border-6 border-primary">
            {title}
        </button>
    )
}

export default SolidBtn