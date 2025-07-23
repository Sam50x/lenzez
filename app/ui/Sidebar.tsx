'use client'

import clsx from "clsx"
import { useState } from "react"
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { linksData } from "../lib/data/linksData"

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const pathName = usePathname()

    const switchSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }



    const LinksItems = linksData.map((link, index) => {

        const { icon, path, name } = link

        return (
            <Link key={index} href={path} className={clsx(
                "w-full px-4 h-16 lg:h-20 flex flex-row gap-2 justify-start items-center text-h5",
                { "bg-accent text-background": pathName === path },
                { "text-text": pathName !== path }
            )} >
                {icon}
                <span>
                    {name}
                </span>
            </Link>
        )
    })

    return (
        <nav className="relative">
            <aside className={clsx("bg-secondary min-h-screen lg:w-1/5 lg:min-w-76 transition-all duration-300 z-20 fixed top-0 left-0 shadow-xl", {
                "w-76": isSidebarOpen,
                "w-0 overflow-hidden": !isSidebarOpen
            }
            )}>
                <div className="flex flex-col justify-start items-start h-screen py-16 lg:py-0">
                    {LinksItems}
                </div>
            </aside>
            {isSidebarOpen &&
                <div className="fixed min-h-screen w-full bg-text z-10 inset-0 opacity-50 lg:hidden" onClick={switchSidebar}></div>
            }
            <button onClick={switchSidebar} className="fixed z-30 top-0 left-0 lg:hidden">
                {isSidebarOpen ?
                    <XMarkIcon className="h-12 px-2 py-2 text-primary hover:text-background hover:cursor-pointer lg:hidden transition-all duration-300" /> :
                    <Bars2Icon className="h-12 px-2 py-2 text-secondary hover:text-background hover:cursor-pointer transition-all duration-300" />}
            </button>
        </nav>
    )
}

export default Sidebar