"use client"

import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef } from "react"


export default function Signin() {

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const route = useRouter();

    async function signin() {
        try {
            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await axios.post(`${HTTP_BACKEND}/signin`, {
                email,
                password
            });
            const data = await response.data;
            const token = data.token;

            localStorage.setItem("token", token);
            // route to /dashboard
            route.replace("/dashboard");

        } catch (error) {
            alert("Invalid credentials");
        }
    }

    return <div className="h-screen w-screen flex justify-center items-center bg-black text-white">
        <div className="h-auto w-96 border border-white rounded-xl p-8 flex flex-col gap-3 ">

            <input type="email" ref={emailRef} className="h-12 w-full px-3 border border-white rounded-lg" placeholder="email@gmail.com" />

            <input type="password" ref={passwordRef} className="h-12 w-full px-3 border border-white rounded-lg" placeholder="strong password" />

            <button className="h-12 w-full bg-blue-400 rounded-lg hover:bg-blue-500 transition-colors duration-300 ease-in-out cursor-pointer "
                onClick={signin}
            >
                Sign in
            </button>
            <div className="flex justify-center items-center">
                not signed-in yet?
                <a href="/signup" className="text-blue-500 ml-2">sign-up</a>
            </div>
        </div>
    </div>
}