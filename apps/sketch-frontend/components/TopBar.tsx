"use client"

import { Circle, Pencil, PenLine, RectangleHorizontal } from "lucide-react"
import Tool from "./Tool"

type Shape = "circle" | "rect" | "pencil" | "line"

export default function TopBar({ selectedTool, setSelectedTool }: {
    selectedTool: Shape,
    setSelectedTool: (s: Shape) => void
}) {
    return <div className="w-auto px-3 py-2 absolute top-5 left-1/2 -translate-x-1/2 z-20 rounded-lg bg-white flex justify-center items-center gap-1 ">
        <Tool icon={<Pencil size={'20'} />} onClick={() => setSelectedTool("pencil")} activated={selectedTool === "pencil"} />
        <Tool icon={<RectangleHorizontal size={'20'} />} onClick={() => setSelectedTool("rect")} activated={selectedTool === "rect"} />
        <Tool icon={<Circle size={'20'} />} onClick={() => setSelectedTool("circle")} activated={selectedTool === "circle"} />
        <Tool icon={<PenLine size={'20'} />} onClick={() => setSelectedTool("line")} activated={selectedTool === "line"} />
    </div>
}