'use client'

import OutlineBtn from "@/app/ui/services/OutlineBtn"
import SolidBtn from "@/app/ui/services/SolidBtn"
import clsx from "clsx"
import { ChangeEvent, useRef, useState } from "react"
import { addImageToSupabaseTable, replaceBackgroundImage, getUser, urlToFile } from "@/app/lib/actions"

type InputInfo = {
    image: File | null;
    prompt: string
}

const ReplaceBg = () => {

    const [inputInfo, setInputInfo] = useState<InputInfo>({
        image: null,
        prompt: '',
    })
    const [previewUrl, setPreviewUrl] = useState<string>('')
    const [afterImage, setAfterImage] = useState<string>('')
    const [isReplacing, setIsReplacing] = useState<boolean>(false)
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleRefToImageInput = () => {
        inputRef.current?.click()
    }

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (file) {
            setInputInfo(prev => ({
                ...prev,
                image: file
            }))
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const handleInfoChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setInputInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleBgReplacing = async () => {
        if (!inputInfo.image) {
            console.error('No image was provided')
            return
        }

        setIsReplacing(true)

        try {
            const afterImageUrl = await replaceBackgroundImage(inputInfo.image, inputInfo.prompt)

            setAfterImage(afterImageUrl)

            const user = await getUser()

            if (user) {
                const file = await urlToFile(afterImageUrl, `${inputInfo.image.name}-${Date.now()}.${inputInfo.image.type}`)
                await addImageToSupabaseTable(file)
            }
        }
        catch (e) {
            console.error(e)
        }
        finally {
            setIsReplacing(false)
        }
    }

    const handleDownload = () => {
        if (!afterImage) return

        const forcedUrl = afterImage
            .replace(/f_auto/g, 'f_jpg')
            .replace('/upload/', '/upload/fl_attachment,f_jpg/')

        const link = document.createElement('a')
        link.href = forcedUrl
        link.download = 'image.jpg'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return (
        <div className='flex flex-col mt-8 px-12'>
            <div className="flex flex-row justify-start items-start flex-wrap gap-6">
                <div className="flex flex-row justify-start items-start flex-wrap gap-2">
                    <div className="w-fit h-fit" onClick={handleRefToImageInput}>
                        <OutlineBtn>
                            <input type="File" className="hidden" ref={inputRef} onChange={handleImageChange} />
                            Choose Image
                        </OutlineBtn>
                    </div>
                    <div className="w-fit h-fit">
                        <OutlineBtn>
                            <input type="text" onChange={handleInfoChange} placeholder="eg. Rainforest" className="text-text" name="prompt" id="prompt" value={inputInfo.prompt} />
                        </OutlineBtn>
                    </div>
                </div>
                <div className="w-fit h-fit" onClick={handleBgReplacing}>
                    <SolidBtn title={isReplacing ? 'Replacing Bg...' : 'Replace Bg'} isDisabled={!inputInfo.image || isReplacing ? true : false} />
                </div>
            </div>
            <div className="flex lg:flex-row justify-center items-start gap-8 mt-12 flex-wrap">
                <div className="w-96">
                    {inputInfo.image ?
                        <img
                            src={previewUrl}
                            alt={`Before Image`}
                            className="object-cover rounded-2xl aspect-square w-full"
                        />
                        : <div className="bg-secondary aspect-square rounded-2xl">
                        </div>
                    }
                </div>
                <div className="rounded-2xl w-96">
                    {afterImage ?
                        <img
                            src={afterImage}
                            alt={`After Image`}
                            className="object-cover rounded-2xl aspect-square w-full"
                        />
                        : <div className="bg-secondary aspect-square rounded-2xl">
                        </div>
                    }
                    <button
                        className={clsx("w-full text-center mt-4 bg-primary rounded-lg text-background py-3",
                            { 'opacity-50': !afterImage },
                            { 'opacity-100 cursor-pointer': afterImage }
                        )}
                        disabled={!afterImage} onClick={handleDownload}>Download</button>
                    <p className="text-small text-center py-2">It Might look different than the real Edited Image, Download it to preview.</p>
                </div>
            </div>
        </div>
    )
}

export default ReplaceBg