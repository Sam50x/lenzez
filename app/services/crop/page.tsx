'use client'

import OutlineBtn from "@/app/ui/services/OutlineBtn"

const page = () => {

    const handleImageChange = () => {
        console.log('CLICKED')
    }

    return (
        <div className='flex flex-col mt-8 px-12'>
            <div className="flex flex-row justify-start items-start flex-wrap">
                <div className="w-fit h-fit" onClick={handleImageChange}>
                    <OutlineBtn>
                        Choose Image
                    </OutlineBtn>
                </div>
            </div>
        </div>
    )
}

export default page