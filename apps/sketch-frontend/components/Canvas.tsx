"use client"

import { initDraw } from "@/sketch";
import { useEffect, useRef, useState } from "react";
import TopBar from "./TopBar";
import { Sketch } from "@/sketch/Sketch";
import { Game } from "@/sketch/Game";

type Shape = "circle" | "rect" | "pencil" | "line"

export default function Canvas({ roomId, socket }: { roomId: string, socket: WebSocket }) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool] = useState<Shape>("circle");
    const [sketch, setSketch] = useState<Sketch>();

    useEffect(() => {

        if(!sketch) {
            return;
        }
        console.log("tool changed to: ", selectedTool);
        sketch.setTool(selectedTool);

    }, [sketch, selectedTool]);

    // useEffect(() => {

    // }, [canvasRef]);

    useEffect(() => {

        const canvas = canvasRef.current;
        // as of this will run twice so at first canvasRef will be null so at that time don't take access of the canvas
        if(!canvas) return;

        const resizeHandler = () => {
            resizeCanvas(canvas, roomId, socket);
            if(!sketch) setSketch(new Sketch(canvas, roomId, socket));
        }

        resizeHandler();
        window.removeEventListener("resize", resizeHandler);

        return () => {
            window.addEventListener("resize", resizeHandler);
            sketch?.destroy();
        }

    }, [canvasRef.current]);

    return <div className="w-screen h-screen ">
        <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool} />
        <canvas ref={canvasRef} className="absolute top-0 left-0" ></canvas>
    </div>
}

function resizeCanvas(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}