const UserImagesSkeleton = () => {
    return (
        <div className="flex flex-col">
            <h4 className="text-h5">Your Images</h4>
            <div className="flex flex-row justify-start items-center flex-wrap pt-4 gap-8">
                <div className="w-50 h-50 lg:w-80 lg:h-80 cursor-pointer bg-secondary rounded-2xl">

                </div>
                <div className="w-50 h-50 lg:w-80 lg:h-80 cursor-pointer bg-secondary rounded-2xl">

                </div>
                <div className="w-50 h-50 lg:w-80 lg:h-80 cursor-pointer bg-secondary rounded-2xl">

                </div>
            </div>
        </div>
    )
}

export default UserImagesSkeleton