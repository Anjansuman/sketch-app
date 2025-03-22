"use client"

import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { WS_URL } from "@/config";


export default function RoomCanvas({ roomId }: { roomId: string }) {

        const [socket, setSocket] = useState<WebSocket | null>(null);
    
        useEffect(() => {

            const token = localStorage.getItem("token");
    
            const ws = new WebSocket(`${WS_URL}?token=${token}`);

            ws.onopen = () => {
                setSocket(ws);
                ws.send(JSON.stringify({
                    type: "join_room",
                    roomId: roomId
                }));
            }

            return () => {
                ws.close();
            }
    
        }, []);

        if(!socket) {
            return <div>
                Connecting to Server...
            </div>
        }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}