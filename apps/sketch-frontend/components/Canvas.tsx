"use client"

import { initDraw } from "@/sketch";
import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";

type Shape = "circle" | "rect" | "pencil"

export default function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Shape>("circle");

    useEffect(() => {

        const canvas = canvasRef.current;
        // as of this will run twice so at first canvasRef will be null so at that time don't take access of the canvas
        if(!canvas) return;

        const resizeHandler = () => {
            resizeCanvas(canvas, roomId, socket);
        }

        resizeHandler();
        window.addEventListener("resize", resizeHandler);

        return () => {
            window.addEventListener("resize", resizeHandler);
        }

    }, [canvasRef]);

    return <div className="w-screen h-screen ">
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <canvas ref={canvasRef} className="absolute top-0 left-0" ></canvas>
    </div>
}

function resizeCanvas(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDraw(canvas, roomId, socket);
}