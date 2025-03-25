import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

import {
  Circle as CircleShape,
  Eraser,
  Moon,
  Rocket,
  RouteOff,
  Square,
  Sun,
} from "lucide-react";
import dayjs from "dayjs";
import { motion } from "framer-motion";

import LinkItem from "./components/LinkItem";
import { Figma, Shadcnui, AntDesign, ChatGPT, V0 } from "./components/Icons";
import GitHubProfile from "./components/profile/GithubProfile";
import GitHubActivityChart from "./components/GitHubActivityChart ";
import { TextAnimate } from "./components/magicui/text-animate";
import { AuroraText } from "./components/magicui/aurora-text";
import { Icon } from "@iconify/react";
import Header from "./components/Header";

const App = () => {
  /*     const LinkList = Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    title: `Link ${index + 1}`,
    url: `https://example.com/link-${index + 1}`,
  }));
 */

  const swapy = useRef(null);
  const container = useRef(null);

  useEffect(() => {
    // If container element is loaded
    if (container.current) {
      swapy.current = createSwapy(container.current);

      // Your event listeners
      swapy.current.onSwap((event) => {
        console.log("swap", event);
      });
    }

    return () => {
      // Destroy the swapy instance on component destroy
      swapy.current?.destroy();
    };
  }, []);

  const LinkList = [
    {
      id: 1,
      title: "Figma",
      url: "https://www.figma.com/",
      icon: <Figma />,
    },
    {
      id: 2,
      title: "shadcn/ui",
      url: "https://ui.shadcn.com/",
      icon: <Shadcnui />,
    },
    {
      id: 3,
      title: "Ant Design",
      url: "https://ant.design/",
      icon: <AntDesign />,
    },
    {
      id: 4,
      title: "ChatGPT",
      url: "https://chatgpt.com/",
      icon: <ChatGPT />,
    },
    {
      id: 5,
      title: "v0",
      url: "https://v0.dev/",
      icon: <V0 />,
    },
    {
      id: 6,
      title: "Link 6",
      url: "https://example.com/link-6",
      icon: "🔗",
    },
    {
      id: 7,
      title: "Link 7",
      url: "https://example.com/link-7",
      icon: "🔗",
    },
    {
      id: 8,
      title: "Link 8",
      url: "https://example.com/link-8",
      icon: "🔗",
    },
    {
      id: 9,
      title: "Link 9",
      url: "https://example.com/link-9",
      icon: "🔗",
    },
    {
      id: 10,
      title: "Link 10",
      url: "https://example.com/link-10",
      icon: "🔗",
    },
  ];

  const generateRandomData = () => {
    const today = dayjs();
    return Array.from({ length: 365 }, (_, i) => ({
      date: today.subtract(i, "day").format("YYYY-MM-DD"),
      count: Math.floor(Math.random() * 5),
    }));
  };

  return (
    <main className="flex flex-col items-start justify-start w-screen min-h-screen h-fit  bg-natural-100 dark:bg-black/95 px-2 md:px-5 ">
      <Header />

      <div className="flex flex-col items-start justify-start w-full h-fit gap-3 p-2 mb-[100px] px-0">

      <div className="w-full  flex items-center justify-center flex-col  bg-natural-100 gap-3 p-10 rounded-md z-40">
          <div className="flex items-center justify-center  gap-3">
          <TextAnimate animation="blurInUp" by="character" delay={.6} once className={'text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl'}>
              Work Space 
           </TextAnimate>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5,delay: 1, ease: "easeOut" }} >
              <Rocket size={50} />
            </motion.div>
          </div>

           <TextAnimate animation="blurInUp" by="line" delay={1} once as="p" className={'text-xs md:text-base text-center'}>
           A modern and efficient workspace designed for developers. 
           </TextAnimate>
           <TextAnimate animation="blurInUp" by="line" delay={1.2} once as="p" className={'text-xs md:text-base text-center'}>
         Code, collaborate, and build the
           future in an optimized environment with the best tools and resources.
           </TextAnimate>
      </div>
      
        <motion.div 
          initial={{ opacity: 0,y: 50 }}  
          whileInView={{ opacity: 1 , y: 0 }}
          transition={{ duration: 0.8,delay: 1.5, ease: "easeOut" }} 
          className="flex items-start justify-start flex-col md:flex-row w-full h-fit gap-3">
          <div className="w-full md:w-fit flex flex-col gap-2">
            <GitHubProfile username="CaptzDevs" className={" top-0"} />

            <div className="w-full darkb:bg-neutral-900 rounded-md">
              <GitHubActivityChart data={generateRandomData()} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-start gap-2  w-full h-fit">
            {LinkList.map((link) => (
              <LinkItem
                title={link.title}
                url={link.url}
                icon={link.icon}
                key={link.id}
              />
            ))}
          </div>
        </motion.div>

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
  );
};




export default App;
