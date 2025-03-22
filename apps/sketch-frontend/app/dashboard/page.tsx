"use client"

import { useRouter } from "next/navigation";

const Dashboard = () => {

    const route = useRouter();

    return <div className="h-screen w-screen bg-black text-white flex justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5 ">
            <div className="text-3xl">
                Sketch App
            </div>
            <div className="flex gap-3">
                <button className="h-12 w-30 text-white bg-blue-400 rounded-md hover:bg-blue-500 transition-colors duration-300 ease-in-out cursor-pointer "
                    onClick={() => {
                        route.replace("/join");
                    }}
                >
                    Join Room
                </button>
                <button className="h-12 w-30 text-white border border-white rounded-md cursor-pointer "
                    onClick={() => {
                        route.replace("/create");
                    }}
                >
                    Create Room
                </button>
            </div>
        </div>
    </div>    
}

export default Dashboard;