import Image from "next/image"

const Hero = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center py-12">
            <div className="relative rounded-3xl w-9/10 h-40 lg:h-62">
                <div className="z-8 absolute inset-0 h-full w-full flex flex-col justify-center items-center rounded-3xl">
                    <h1 className="lg:text-h1 text-h3 text-text">Lenzez</h1>
                    <h4 className="lg:text-h4 text-body text-text">Your Favorite AI Photo Editor</h4>
                </div>
                <div className="bg-primary w-full h-full rounded-3xl absolute inset-0 z-5 opacity-30">
                </div>
                <Image
                    src={'/images/hero-sky.webp'}
                    width={3504}
                    height={2336}
                    alt="sky"
                    className="w-full h-full object-cover rounded-3xl absolute inset-0 z-0"
                />
            </div>
            <div className="relative rounded-xl w-1/2 h-6 lg:h-12 mt-4">
                <div className="bg-primary w-full h-full rounded-xl absolute inset-0 z-5 opacity-30">
                </div>
                <Image
                    src={'/images/hero-sky.webp'}
                    width={3504}
                    height={2336}
                    alt="sky"
                    className="w-full h-full object-cover rounded-xl absolute inset-0 z-0"
                />
            </div>
        </div>
    )
}

export default Hero