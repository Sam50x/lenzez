'use client'

import clsx from "clsx"
import { useEffect, useState } from "react"
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { linksData } from "../lib/data/linksData"
import { getUser, signInWithGoogle, signOutWithGoogle } from "../lib/actions"

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
    const [isWorkingNow, setIsWorkingNow] = useState(false)
    const pathName = usePathname()

    const switchSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    const asyncGetUser = async () => {
        const user = await getUser()

        if (user) setIsUserLoggedIn(true)
        else setIsUserLoggedIn(false)
    }

    useEffect(() => {
        asyncGetUser()
    }, [])

    const LinksItems = linksData.map((link, index) => {

        const { icon, path, name } = link

        return (
            <Link key={index} href={path} className={clsx(
                "w-full px-4 lg:px-6 h-16 lg:h-20 flex flex-row gap-4 justify-start items-center text-h5",
                { "bg-accent text-background": pathName === path },
                { "text-text": pathName !== path }
            )} >
                <span className="[&>svg]:h-[1em] [&>svg]:w-[1em] [&>svg]:-mt-0.5">
                    {icon}
                </span>
                <span>
                    {name}
                </span>
            </Link>
        )
    })

    const switchSignIn = async () => {

        setIsWorkingNow(true)

        if (isUserLoggedIn) {
            await signOutWithGoogle()
        }
        else {
            await signInWithGoogle()
        }

        setIsWorkingNow(false)
        asyncGetUser()
    }

    return (
        <nav className="relative">
            <aside className={clsx("bg-secondary min-h-screen lg:w-1/5 lg:min-w-80 transition-all duration-300 z-20 fixed top-0 left-0 shadow-xl", {
                "w-80": isSidebarOpen,
                "w-0 overflow-hidden": !isSidebarOpen
            }
            )}>
                <div className="flex flex-col justify-between h-screen py-16 lg:py-0">
                    <div className="flex flex-col">
                        {LinksItems}
                    </div>
                    <div className="px-4 lg:px-6 pb-4">
                        <button className="w-full bg-accent text-background px-4 py-3 rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer" onClick={switchSignIn}>
                            {isWorkingNow ? 'Working on it...' : isUserLoggedIn ? 'Sign Out' : 'Sign In With Google'}
                        </button>
                    </div>
                </div>
            </aside>
            {isSidebarOpen &&
                <div className="fixed min-h-screen w-full bg-text z-10 inset-0 opacity-50 lg:hidden" onClick={switchSidebar}></div>
            }
            <button onClick={switchSidebar} className="fixed z-30 top-0 left-0 lg:hidden">
                {isSidebarOpen ?
                    <XMarkIcon className="h-12 px-2 py-2 text-background hover:text-accent hover:cursor-pointer lg:hidden transition-all duration-300" /> :
                    <Bars2Icon className="h-12 px-2 py-2 text-text hover:text-accent hover:cursor-pointer transition-all duration-300" />}
            </button>
        </nav>
    )
}

export default Sidebar