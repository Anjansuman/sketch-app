"use client"

import Router, { useRouter } from "next/navigation";

export default function Home() {

  const route = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-black  ">
      <div className="text-white text-3xl">Sketch App</div>
      <div className="flex gap-3">
        <button className="h-12 w-28 text-white bg-blue-400 rounded-md hover:bg-blue-500 transition-colors duration-300 ease-in-out cursor-pointer "
          onClick={() => {
            route.push('/signup');
          }}
        >
          Sign up
        </button>
        <button className="h-12 w-28 text-white border border-white rounded-md cursor-pointer "
          onClick={() => {
            route.push('/signin');
          }}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
