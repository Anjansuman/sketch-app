"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {

  const [roomId, setRoomId] = useState("");
  const route = useRouter();

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <input type="text"
          style={{
            padding: '10px'
          }}
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        />
        <button
          onClick={() => {
            route.push(`room/${roomId}`)
          }}
        >
          Join room
        </button>
      </div>
    </div>
  );
}
