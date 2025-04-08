import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import {
  AlignLeft,
  CalendarDays,
  CalendarRange,
  ChevronLeft,
  Hash,
  User,
} from "lucide-react";
import { useSections } from "@/context/SectionContext";
import { cn } from "@/lib/utils";
import WidgetCalendarRange from "./WidgetCalendarRange";
import { motion } from "framer-motion";

const BlockType = [
  {
    name: "Text",
    value: "text",
    icon: <AlignLeft style={{ width: "16px" }} />,
    description: "Plain text block for entering and formatting text.",
  },
  {
    name: "Number",
    value: "number",
    icon: <Hash style={{ width: "16px" }} />,
    description: "Numeric block for storing and calculating numbers.",
  },
  {
    name: "Calendar",
    value: "calendar",
    icon: <CalendarDays style={{ width: "16px" }} />,
    description: "Date selector for scheduling or timestamping events.",
  },
  {
    name: "Calendar Range",
    value: "calendar-range",
    icon: <CalendarRange style={{ width: "16px" }} />,
    description: "Code block for syntax-highlighted programming snippets.",
  },
];

const WIDGET_TYPE = {
  "calendar": <WidgetCalendarRange numberOfMonths={1} mode="single" />,
  "calendar-range": <WidgetCalendarRange />,
};

export function SectionDropdown({ children, path, open , onOpenChange }) {
  const [isOpen, setIsOpen] = useState(open);
  const [blockData, setBlockData] = useState(null);

  const { editBlockProps, getBlock } = useSections();
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {

    if (isOpen) {
      const d = getBlock(path).block;
      setBlockData(d);
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(()=>{
    if(isOpen){
      setSelectedValue(blockData?.type);
    }
  },[blockData , isOpen]);



  const handleItemClick = (e, item) => {
    e.preventDefault();
    setSelectedValue(item.value);
  };

  const onClose = (isClose) =>{
    if(!isClose){
      editBlockProps(path, "type", selectedValue);
    }
      setIsOpen(isClose);
      onOpenChange(isClose);
  }


  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={onClose}
      className=""
      tabIndex={-1}
      
    >
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

      <DropdownMenuContent 
        className=" text-sm transition-all duration-150 p-3"
        sideOffset={15}
        align={"start"}
        collisionPadding={50}
        loop={true}
        //onInteractOutside={(e)=> e.preventDefault()}
        onKeyDown={(e) => {
          setIsOpen(false);
          onOpenChange(false);
        }}
      >
        <div className="flex gap-3 ">

          {/*  <DropdownMenuLabel className={'text-[.6rem]'}>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator /> */}

          <DropdownMenuGroup className="flex flex-col  gap-3">
            {BlockType.map((item) => (
              <DropdownMenuItem
                key={item.name}
                className={cn(
                  "text-xs cursor-pointer  ",
                  selectedValue === item.value &&
                    "bg-neutral-300 dark:bg-neutral-800"
                )}
                onSelect={(e) => handleItemClick(e, item)}

              >
                {item.icon}
                <div className="flex flex-col ml-2 gap-1">
                  <span className="flex-2">{item.name}</span>
                  <span className="flex-1 text-[.4rem]">
                    {item.description} 
                  </span>
                </div>
              </DropdownMenuItem>
            ))}

          </DropdownMenuGroup>
            {WIDGET_TYPE[selectedValue]}
        </div>
      {/* <div className="w-full flex justify-end " ><Button className={'text-[.6rem]'}>Save</Button> </div> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
