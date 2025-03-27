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
import { cn } from "@/lib/utils";

const _SIZE = {
  small: "small",
  default: "default",
  large: "large",
};

export default function LinkItem({
  id,
  title,
  icon,
  url,
  size = _SIZE["default"],

  showLink = false,
}) {
  const OpenLink = (url) => {
    window.open(url, "_blank");
  };

  const renderIcon = (icon) => {
    if (typeof icon === "string" && icon.startsWith("http")) {
      if (icon.startsWith("https://svgl.app/"))
        return <img src={icon} alt={title} width={"30"} />;
    }
    return icon;
  };

  return (
    <Card
      className={cn(
        "dark:hover:bg-neutral-800 transition-all duration-100 cursor-pointer w-full",
        size === _SIZE["small"] && "min-w-[150px]"
      )}
      onClick={() => OpenLink(url)}
    >
      <CardHeader
        className={cn(
          "flex gap-0",
          size === _SIZE["small"] && "items-start justify-center"
        )}
      >
        <CardTitle
          className={cn(
            "flex gap-2 items-center justify-between w-full",
            size === _SIZE["small"] && "items-start justify-start gap-0"
          )}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="bg-neutral-900 p-2 rounded-sm ">
              {renderIcon(icon)}{" "}
            </div>
            {size === _SIZE["default"] && title}
          </div>
        </CardTitle>
      </CardHeader>
      {size === _SIZE["default"] && showLink && (
        <CardContent className={"h-full"}>
          {showLink && <CardDescription>{url}</CardDescription>}
        </CardContent>
      )}
    </Card>
  );
}
