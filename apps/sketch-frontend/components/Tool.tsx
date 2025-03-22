"use client"

import { ReactNode } from "react";

interface ToolProps {
    icon: ReactNode,
    onClick: () => void,
    activated: boolean
}

export default function Tool({ icon, onClick, activated }: ToolProps) {
    return <div className={` ${activated ? "text-blue-400" : "text-black"} cursor-pointer`}
        onClick={onClick}
    >
        {icon}
    </div>
}