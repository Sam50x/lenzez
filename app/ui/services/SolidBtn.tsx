import clsx from "clsx"

type props = {
    title: string,
    isDisabled: boolean,
}

const SolidBtn = ({ title, isDisabled }: props) => {
    return (
        <button
            className={clsx("bg-primary text-background rounded-lg py-3 px-6 text-center border-6 border-primary duration-300",
                {'opacity-50': isDisabled},
                {'cursor-pointer hover:opacity-80': !isDisabled}
            )}
            disabled={isDisabled}>
            {title}
        </button>
    )
}

export default SolidBtn