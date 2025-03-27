import Header from '@/components/Header'
import React from 'react'
import { Outlet } from 'react-router'
import {
  Rocket,
} from "lucide-react";
import dayjs from "dayjs";
import { Icon } from "@iconify/react";

export default function Layout() {
  return (
    <main className="flex flex-col items-start justify-start w-screen min-h-screen h-fit  bg-natural-100 dark:bg-black/95 px-2 md:px-5 ">
    <Header />
    <div className="min-h-screen flex flex-col items-center justify-start w-full h-fit gap-3 p-2 mb-[300px] px-0">

            <Outlet/>

    </div>
    <footer className=" w-full">
  <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row ">
      <a href="#" className=""> 
          <span className="text-neutral-700 flex items-center gap-1">  Work Space <Rocket size={20}/></span>
      </a>

      <p className="text-sm text-gray-600 dark:text-gray-300">© Copyright {dayjs().year()}. All Rights Reserved.</p>

      <div className="flex -mx-2">
          <a href="#" className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
          <Icon icon="mdi:github" width="24" height="24" />
          </a>
          <a href="#" className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
             <Icon icon="ic:baseline-discord" width="24" height="24" />
          </a>
         
          <a href="#" className="mx-2 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
          <Icon icon="ri:twitter-x-fill" width="24" height="24" />
          </a>
      </div>
    
  </div>
</footer>
  </main>
  )
}
