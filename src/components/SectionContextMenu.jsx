import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useSections } from "@/context/SectionContext";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function SectionContextMenu({ children , type }) {
  const {
    removeItem,
    selected,
    addItem,
    editBlockStyle,
    sections,
    handleItemChange,
    block,
  } = useSections();

  const [isOpen, setIsOpen] = useState(false);


  const colors = [
      { name: "default", value: "default", isClear: true, label: "Default" },
      { name: "red", value: "text-red-400" },
      { name: "orange", value: "text-orange-400" },
      { name: "amber", value: "text-amber-400" },
      { name: "yellow", value: "text-yellow-400" },
      { name: "lime", value: "text-lime-400" },
      { name: "green", value: "text-green-400" },
      { name: "emerald", value: "text-emerald-400" },
      { name: "teal", value: "text-teal-400" },
      { name: "cyan", value: "text-cyan-400" },
      { name: "sky", value: "text-sky-400" },
      { name: "blue", value: "text-blue-400" },
      { name: "indigo", value: "text-indigo-400" },
      { name: "violet", value: "text-violet-400" },
      { name: "purple", value: "text-purple-400" },
      { name: "fuchsia", value: "text-fuchsia-400" },
      { name: "pink", value: "text-pink-400" },
      { name: "rose", value: "text-rose-400" },
      { name: "white", value: "text-white" },
      { name: "black", value: "text-black" },
    ];

  const backgroundColors = [
    { name: "default", value: "default", isClear: true, label: "Default" },
    { name: "red", value: "bg-red-400" },
    { name: "orange", value: "bg-orange-400" },
    { name: "amber", value: "bg-amber-400" },
    { name: "yellow", value: "bg-yellow-400" },
    { name: "lime", value: "bg-lime-400" },
    { name: "green", value: "bg-green-400" },
    { name: "emerald", value: "bg-emerald-400" },
    { name: "teal", value: "bg-teal-400" },
    { name: "cyan", value: "bg-cyan-400" },
    { name: "sky", value: "bg-sky-400" },
    { name: "blue", value: "bg-blue-400" },
    { name: "indigo", value: "bg-indigo-400" },
    { name: "violet", value: "bg-violet-400" },
    { name: "purple", value: "bg-purple-400" },
    { name: "fuchsia", value: "bg-fuchsia-400" },
    { name: "pink", value: "bg-pink-400" },
    { name: "rose", value: "bg-rose-400" },
    { name: "white", value: "bg-white" },
    { name: "black", value: "bg-black" },
  ];


  const textStyle = [
    {
      name: 'pageHeader',
      label : 'Page Header',
      value : 'text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl pb-2',
    },
    {
      name: 'header',
      label : 'Header' ,
      value : 'text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl',
    }
  ]

  const setStyle = (propName, value) => {
    editBlockStyle(selected.sectionIndex, selected.itemIndex, propName, value);
  };

  const resetStyle = (propsName) => {
    if (Array.isArray(propsName)) {
      propsName.forEach((prop) => {
        editBlockStyle(selected.sectionIndex, selected.itemIndex, prop, "");
      });
    } else {
      editBlockStyle(selected.sectionIndex, selected.itemIndex, propsName, "");
    }
  };

  return (
    <ContextMenu onOpenChange={setIsOpen} className="hover:outline-none">
      <ContextMenuTrigger className='w-full ' >
        {children}
      </ContextMenuTrigger>
    
      <ContextMenuContent className="w-64 ">
        { type === '2' && <>
            <ContextMenuItem
            inset
            className={"text-[.6rem]"}
            onClick={() => addItem(selected.sectionIndex, selected.itemIndex)}
          >
            Calendar 
            <ContextMenuShortcut>⌘</ContextMenuShortcut>
          </ContextMenuItem>

          <ContextMenuItem
            inset
            className={"text-[.6rem]"}
            onClick={() => removeItem(selected.sectionIndex, selected.itemIndex)}
          >
            Remove
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
        </>
        }


        <ContextMenuItem
          inset
          className={"text-[.6rem]"}
          onClick={() => addItem(selected.sectionIndex, selected.itemIndex)}
        >
          New Block 
          <ContextMenuShortcut>⌘</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          inset
          className={"text-[.6rem]"}
          onClick={() => removeItem(selected.sectionIndex, selected.itemIndex)}
        >
          Remove
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          inset
          className={"text-[.6rem]"}
          onClick={() => resetStyle(["color", "background"])}
        >
          Clear Style
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuSeparator />
       {/*  <ContextMenuCheckboxItem
          className={"text-[.6rem]"}
          checked={block?.pageHeader}
          onClick={() =>
            handleItemChange(
              selected.sectionIndex,
              selected.itemIndex,
              "pageHeader",
              !block?.pageHeader
            )
          }
        >
         Page Header

        </ContextMenuCheckboxItem>

        <ContextMenuCheckboxItem
          className={"text-[.6rem]"}
          checked={block?.header }
          onClick={() =>
            handleItemChange(
              selected.sectionIndex,
              selected.itemIndex,
              'header',
              !block?.header,
            )
          }
        >
         Header
        </ContextMenuCheckboxItem> */}

        <ContextMenuSub>
          <ContextMenuSubTrigger className={'text-[.6rem]'} inset>Text</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup
              value={block?.props?.style?.color ?? "default"}
            >
              {textStyle.map((text) => (
                <TextBlock
                  key={text.name}
                  varient={"text"}
                  value={text.value}
                  colorName={text.name}
                  label={text.label}
                  onClick={() =>
                    text.isClear
                      ? resetStyle("color")
                      : setStyle("text", text.value)
                  }
                />
              ))}
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>


        <ContextMenuSub>
          <ContextMenuSubTrigger className={'text-[.6rem]'} inset>Color</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup
              value={block?.props?.style?.color ?? "default"}
            >
              {colors.map((color) => (
                <ColorBlock
                  key={color.name}
                  varient={"text"}
                  value={color.value}
                  colorName={color.name}
                  label={color.label}
                  onClick={() =>
                    color.isClear
                      ? resetStyle("color")
                      : setStyle("color", `text-${color.name}-400`)

                  }
                />
              ))}
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger className={'text-[.6rem]'} inset>Background</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup
              value={block?.props?.style?.background ?? "default"}
            >
              {backgroundColors.map((color) => (
                <ColorBlock
                  key={color.name}
                  varient={"block"}
                  value={color.value}
                  colorName={color.name}
                  label={color.label}
                  onClick={() =>
                    color.isClear
                      ? resetStyle("background")
                      : setStyle("background", color.value)
                  }
                />
              ))}
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
}

const ColorBlock = ({ value, onClick, varient, label , colorName }) => {
  return (
    <ContextMenuRadioItem
      value={value}
      onClick={onClick}
      className={"text-[.6rem]"}
    >
      {varient === "text" ? (
        <div className={cn("rounded-full ",value)}>
          
          {label || "Aa"} {label ? null : colorName}
        </div>
      ) : (
      <div className="flex gap-2 items-center justify-center">
          <div
          className={cn("w-3 h-3 rounded-full ",value)}
        >
          {label} 
        </div>
        <span
          style={{ color: value }}
          >
            {label ? null : colorName}
            </span> 
      </div>
      )}
    </ContextMenuRadioItem>
  );
};


const TextBlock = ({ value, onClick, varient, label  }) => {
  return (
    <ContextMenuRadioItem
      value={value}
      onClick={onClick}
      className={"text-[.6rem]"}
    >
        <div className={cn("rounded-full ")}>
          
        Aa {label} 
        </div>
        
    </ContextMenuRadioItem>
  );
};
