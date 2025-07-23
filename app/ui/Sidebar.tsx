'use client'

import clsx from "clsx"
import { useState } from "react"
import { Bars2Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Sidebar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const switchSidebar = () => {
        setIsSidebarOpen(prev => !prev)
    }

    return (
        <nav className="relative">
            <aside className={clsx("bg-secondary min-h-screen lg:w-1/5 lg:min-w-76 transition-all duration-300", {
                "w-76": isSidebarOpen,
                "w-0 overflow-hidden": !isSidebarOpen
            }
            )}>
            </aside>
            <button onClick={switchSidebar} className="absolute top-0 left-0 lg:hidden">
                {isSidebarOpen ?
                    <XMarkIcon className="h-12 px-2 py-2 text-primary hover:text-background hover:cursor-pointer lg:hidden transition-all duration-300" /> :
                    <Bars2Icon className="h-12 px-2 py-2 text-secondary hover:text-background hover:cursor-pointer transition-all duration-300" />}
            </button>
        </nav>
    )
}

export default Sidebar