import { HomeIcon, ScissorsIcon, ArrowsPointingOutIcon, BackspaceIcon, ArrowPathIcon, ArchiveBoxXMarkIcon, ArrowsRightLeftIcon, SparklesIcon } from "@heroicons/react/24/solid"

export const linksData = [
    {
        name: "Home",
        path: "/",
        icon: <HomeIcon />,
    },
    {
        name: "Crop",
        path: "/services/crop",
        icon: <ScissorsIcon />,
    },
    {
        name: "Generative Fill",
        path: "/services/gen_fill",
        icon: <ArrowsPointingOutIcon />,
    },
    {
        name: "Remove Background",
        path: "/services/remove_bg",
        icon: <BackspaceIcon />,
    },
    {
        name: "Replace Background",
        path: "/services/replace_bg",
        icon: <ArrowPathIcon />,
    },
    {
        name: "Remove Object",
        path: "/services/remove_obj",
        icon: <ArchiveBoxXMarkIcon />,
    },
    {
        name: "Replace Object",
        path: "/services/replace_obj",
        icon: <ArrowsRightLeftIcon />,
    },
    {
        name: "Enhance",
        path: "/services/enhance",
        icon: <SparklesIcon />,
    },
]