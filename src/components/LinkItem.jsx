import React, { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

export default function LinkItem({id, title, icon, url }) {

  const OpenLink = (url) => {
    window.open(url, "_blank");
  };

  const renderIcon = (icon) => {
    if (typeof icon === "string" && icon.startsWith("http")) {
      return <img src={icon} alt={title} />;
    }
    return icon;
  }
    
  return (
        <Card className={' dark:hover:bg-neutral-800 transition-all duration-100 cursor-pointer '}
        onClick={() => OpenLink(url)}>
      <CardHeader>
            <CardTitle className={'flex gap-2 items-center'}> 
                <div className="bg-neutral-900 p-2 rounded-sm">{renderIcon(icon)} </div>
                {title}</CardTitle>
      </CardHeader>
      <CardContent className={'h-full'}>
        <CardDescription>{url}</CardDescription>
      </CardContent>
    </Card>
  );
}
