"use client"

import { Circle, Pencil, RectangleHorizontal } from "lucide-react"
import Tool from "./Tool"

type Shape = "circle" | "rect" | "pencil"

export default function TopBar({ selectedTool, setSelectedTool }: {
    selectedTool: Shape,
    setSelectedTool: (s: Shape) => void
}) {
    return <div className="w-auto p-3 absolute top-5 left-1/2 -translate-x-1/2 z-20 rounded-lg bg-white flex justify-center items-center gap-4 ">
        <Tool icon={<Pencil />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil"} />
        <Tool icon={<RectangleHorizontal />} onClick={() => setSelectedTool("rect")} activated={selectedTool === "rect"} />
        <Tool icon={<Circle />} onClick={() => setSelectedTool("circle")} activated={selectedTool === "circle"} />
    </div>
}