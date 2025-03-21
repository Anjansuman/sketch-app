"use client"

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket"

export function ChatRoomclient({
    chat,
    id
}: {
    chat: { message: string }[],
    id: string
}) {

    const [chats, setChats] = useState(chat);
    const { socket, loading } = useSocket();
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {

        if(socket && !loading) {

            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }))

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if(parsedData.type === "chat") {
                    // check for the correct room
                    setChats(c => [...c, { message: parsedData.message }]);
                }
            }
        }

    }, [socket, loading, id]);

    return <div>
        {chats.map((m, key) => <div key={key}>
            {m.message}
        </div>)}
        <input type="text" value={currentMessage} onChange={(e) => {
            setCurrentMessage(e.target.value);
        }} />
        <button
            onClick={() => {
                socket?.send(JSON.stringify({
                    type: "chat",
                    roomId: id,
                    message: currentMessage
                }));
                setCurrentMessage("");
            }}
        >
            Send
        </button>
    </div>

}