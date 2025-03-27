import { Rocket, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SiReact, SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import dayjs from "dayjs";

import LinkItem from "@/components/LinkItem";
import GitHubProfile from "@/components/profile/GithubProfile";
import GitHubActivityChart from "@/components/GitHubActivityChart ";
import {
  LinkBackend,
  LinkDeploy,
  LinkDesign,
  LinkFrontend,
} from "@/components/LinkData";
import { NumberTicker } from "@/components/magicui/number-ticker";

export default function App() {
  const generateRandomData = () => {
    const today = dayjs();
    return Array.from({ length: 365 }, (_, i) => ({
      date: today.subtract(i, "day").format("YYYY-MM-DD"),
      count: Math.floor(Math.random() * 5),
    }));
  };

  return (
    <div className="container  md:w-3/4 flex flex-col gap-[150px] ">
      <div className="w-full h-[80dvh]  flex items-start justify-center flex-col  bg-natural-100 gap-3 py-10 rounded-md z-40">
        <div className="flex items-start justify-start  gap-3">
          <TextAnimate
            animation="blurInUp"
            by="character"
            once
            className={
              "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl"
            }
          >
            Captain Siwakorn
          </TextAnimate>
        </div>
        <TextAnimate
          animation="blurInUp"
          by="line"
          delay={0.5}
          once
          as="p"
          className={"text-xs md:text-xl text-center"}
        >
          Developers.
        </TextAnimate>
        <TextAnimate
          animation="blurInUp"
          by="line"
          delay={0.8}
          once
          as="p"
          className={"text-xs md:text-base text-center"}
        >
          Code, collaborate, and build the future in an optimized environment
          with the best tools and resources.
        </TextAnimate>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
        className="flex items-start justify-start flex-col md:flex-row w-full h-fit gap-3"
      >
        <div className="w-full md:w-fit flex flex-col gap-2">
          <GitHubProfile username="CaptzDevs" className={" top-0"} />

          <div className="w-full darkb:bg-neutral-900 rounded-md">
            <GitHubActivityChart data={generateRandomData()} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-3">
          <LinkSection data={LinkFrontend} title="Frontend" />
          <LinkSection data={LinkDesign} title="Design" />

          <LinkSection data={LinkDeploy} title="Deployment" />
          <LinkSection data={LinkBackend} title="Backend" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid sm:grid-cols-3 items-center justify-center   w-full h-fit gap-20 sm:gap-3"
      >
        <Exprience label={"Exprience"} postfix={"years"} value={3} />
        <Exprience label={"Projects"}  postfix={"years"} value={35} />
        <Exprience label={"Customer"}  postfix={"years"} value={150} />
      </motion.div>
    </div>
  );
}

const LinkSection = ({ title, data }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      {title && <span className="text-md">{title}</span>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start justify-start gap-2  w-full h-fit">
        {data.map((link, index) => (
          <LinkItem
            title={link.title}
            url={link.url}
            icon={link.icon}
            key={"link-" + title + "-" + index}
            showLink={false}
          />
        ))}
      </div>
    </div>
  );
};

export const Exprience = ({ label, value, postfix }) => {
  return (
    <div className="flex items-center justify-center flex-col gap-2">
     <div>
     <span className="text-md">{label}</span>
      <div className="flex items-end justify-center gap-2">
        <NumberTicker
          value={value}
          className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white"
        />
        {postfix}
      </div>
     </div>
    </div>
  );
};
