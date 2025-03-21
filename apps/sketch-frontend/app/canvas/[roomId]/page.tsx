"use client"

import { initDraw } from "@/sketch";
import { useEffect, useRef } from "react";


export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      
        // as of this will run twice so at first canvasRef will be null so at that time don't take access of the canvas
        if(canvasRef.current) {
            initDraw(canvasRef.current);
        }

    }, [canvasRef]);

    return <div className="w-screen h-screen ">
        <canvas ref={canvasRef} width={500} height={500} className="" ></canvas>
    </div>
}