import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";


export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>();

    useEffect(() => {
        const ws = new WebSocket(`${WS_URL}?token=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyNDE3OTRmOC0wYTYzLTQ2NWItOTlhOS1kYWM2MzM0NzIxYWIiLCJpYXQiOjE3NDI0NzYwNDd9.0CViVf_fulroYzCz7R1rMb_Kj-T0nVFrui7LLlU5BbU`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }
    }, []);

    return {
        socket,
        loading
    }
}