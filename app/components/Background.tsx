'use client'

import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const Background = () => {

    useGSAP(() =>{
        gsap.to('#bg', {
            opacity: 0.2,
            repeat: -1,
            yoyo: true,
            duration: 10,
            ease: 'power1.inOut',
        })
    })

    return (
        <section id="bg" className="bg-gray-700 min-h-screen w-screen fixed z-0 opacity-100">

        </section>
    )
}

export default Background