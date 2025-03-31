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

export function SectionContextMenu({ children }) {
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

  /*   useEffect(()=>{
      if(block){
        console.log(block,'3333dasdas')
      }
    },[isOpen,block]) */

  const colors = [
    { name: "default", value: "default", isClear: true, label: "Default" },
    { name: "red", value: "var(--color-red-400)" },
    { name: "orange", value: "var(--color-orange-400)" },
    { name: "amber", value: "var(--color-amber-400)" },
    { name: "yellow", value: "var(--color-yellow-400)" },
    { name: "lime", value: "var(--color-lime-400)" },
    { name: "green", value: "var(--color-green-400)" },
    { name: "emerald", value: "var(--color-emerald-400)" },
    { name: "teal", value: "var(--color-teal-400)" },
    { name: "cyan", value: "var(--color-cyan-400)" },
    { name: "sky", value: "var(--color-sky-400)" },
    { name: "blue", value: "var(--color-blue-400)" },
    { name: "indigo", value: "var(--color-indigo-400)" },
    { name: "violet", value: "var(--color-violet-400)" },
    { name: "purple", value: "var(--color-purple-400)" },
    { name: "fuchsia", value: "var(--color-fuchsia-400)" },
    { name: "pink", value: "var(--color-pink-400)" },
    { name: "rose", value: "var(--color-rose-400)" },
    { name: "white", value: "var(--color-white)" },
    { name: "black", value: "var(--color-black)" },
  ];

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
        <ContextMenuCheckboxItem
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

        </ContextMenuCheckboxItem>



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
                      : setStyle("color", color.value)
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
              {colors.map((color) => (
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
        <div className={cn(" rounded-full")} style={{ color: value }}>
          {label || "Aa"} {label ? null : colorName}
        </div>
      ) : (
      <div className="flex gap-2 items-center justify-center">
          <div
          className={cn("w-3 h-3 rounded-full ")}
          style={{ background: value }}
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
