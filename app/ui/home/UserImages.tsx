'use client'

import { useState, useEffect } from "react"
import { getAllImages, getUser } from "@/app/lib/actions"
import Image from "next/image"
import UserImagesSkeleton from "../skeletons/UserImagesSkeleton"

const UserImages = () => {

    const [images, setImages] = useState([])
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const getImages = async () => {
        const imgs = await getAllImages()

        if (imgs) {
            setImages(imgs)
        }
        else {
            setImages([])
        }
    }

    const asyncGetUser = async () => {
        const user = await getUser()

        if (user) setIsUserLoggedIn(true)
        else setIsUserLoggedIn(false)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            await asyncGetUser()
            if (isUserLoggedIn) {
                await getImages()
            }
            setIsLoading(false)
        }

        fetchData()
    }, [isUserLoggedIn])

    const imagesItems = images.map((img, index) => {

        const { image_path } = img

        return (
            <div key={index} className="w-50 h-50 lg:w-80 lg:h-80 cursor-pointer">
                <Image
                    src={image_path}
                    width={1000}
                    height={1000}
                    alt={`Image with index ${index}`}
                    className="object-cover rounded-2xl"
                />
            </div>
        )
    })

    return (
        <div className="flex flex-col px-8 lg:px-16">
            {isUserLoggedIn ?
                isLoading ?
                    <UserImagesSkeleton />
                    :
                    images.length > 0 ?
                        <div className="flex flex-col">
                            <h4 className="text-h5">Your Images</h4>
                            <div className="flex flex-row justify-center items-center flex-wrap pt-4 gap-8">
                                {imagesItems}
                            </div>
                        </div>
                        :
                        <div>
                            <h4 className="text-h5 text-center">You have no images yet.</h4>
                            <h4 className="text-h5 text-center">Start creating now.</h4>
                        </div>
                :
                <div className="flex flex-col justify-center items-center">
                    <h4 className="text-h5 text-center">You need to sign in to save your Images</h4>
                </div>
            }
        </div>
    )
}

export default UserImages