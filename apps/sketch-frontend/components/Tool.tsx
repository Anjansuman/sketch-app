"use client"

import { ReactNode } from "react";

interface ToolProps {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}

export default function Tool({ icon, onClick, activated }: ToolProps) {
    return <div className={` ${activated ? "text-blue-400 bg-gray-200" : "text-black"} cursor-pointer hover:bg-gray-200 transition-colors duration-200 ease-in-out p-2 rounded-lg`}
        onClick={onClick}
    >
        {icon}
    </div>
}