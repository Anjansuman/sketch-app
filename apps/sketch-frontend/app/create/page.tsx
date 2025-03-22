"use client"

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function CreateRoom() {

    const nameRef = useRef<HTMLInputElement>(null);
    const route = useRouter();

    async function create() {
        try {
            const name = nameRef.current?.value;

            const response = await axios.post(`${HTTP_BACKEND}/room/create-room`, {
                name
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await response.data;
            route.push(`/canvas/${data.room}`);

            
        } catch (error) {
            alert(error);
        }
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-black text-white">
    <div className="h-auto w-96 border border-white rounded-xl p-8 flex flex-col gap-3 ">

        <input type="email" ref={nameRef} className="h-12 w-full px-3 border border-white rounded-lg" placeholder="Room name" />

        <button className="h-12 w-full bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out cursor-pointer "
            onClick={create}
        >
            Create Room
        </button>
    </div>
</div>
}