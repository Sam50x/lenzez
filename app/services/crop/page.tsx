'use client'

import OutlineBtn from "@/app/ui/services/OutlineBtn"
import SolidBtn from "@/app/ui/services/SolidBtn"

const page = () => {

    return (
        <div className='flex flex-col mt-8 px-12'>
            <div className="flex flex-row justify-start items-start flex-wrap gap-6">
                <div className="flex flex-row justify-start items-start flex-wrap gap-2">
                    <div className="w-fit h-fit">
                        <OutlineBtn>
                            <input type="File" className="hidden" />
                            Choose Image
                        </OutlineBtn>
                    </div>
                    <div className="w-fit h-fit">
                        <OutlineBtn>
                            <select name="ratio" id="ratio">
                                <option value="1">1:1</option>
                                <option value="0.5">1:2</option>
                                <option value="2.5">5:2</option>
                            </select>
                        </OutlineBtn>
                    </div>
                </div>
                <div className="w-fit h-fit">
                    <SolidBtn title="Crop" />
                </div>
            </div>
        </div>
    )
}

export default page