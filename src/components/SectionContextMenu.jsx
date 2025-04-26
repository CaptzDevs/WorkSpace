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
import {
  AlignLeft,
  CalendarDays,
  CalendarRange,
  Hash,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

export function SectionContextMenu({ children, type, path }) {
  const {
    removeBlock,
    selected,
    addItem,
    addIChild,
    editBlockStyle,
    editBlockProps,
    sections,
    handleItemChange,
    getBlock,
    colors,
    backgroundColors
  } = useSections();

  const [isOpen, setIsOpen] = useState(false);
  const [blockData, setBlockData] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const d = getBlock(path).block;
      setBlockData(d);
      console.log(d, "pfsafjas");
    }
  }, [isOpen]);

  

  const x_textStyle = [
    {
      name: "pageHeader",
      label: "Page Header",
      value: "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl pb-2",
    },
    {
      name: "header",
      label: "Header",
      value: "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl",
    },
  ];

  const BlockType = [
    {
      name: "Text",
      value: "text",
      icon: <AlignLeft style={{ width: "14px" }} />,
      description: "Plain text block for entering and formatting text.",
    },
    {
      name: "Number",
      value: "number",
      icon: <Hash style={{ width: "14px" }} />,
      description: "Numeric block for storing and calculating numbers.",
    },
    {
      name: "Calendar",
      value: "calendar",
      icon: <CalendarDays style={{ width: "14px" }} />,
      description: "Date selector for scheduling or timestamping events.",
    },
    {
      name: "Calendar Range",
      value: "calendar-range",
      icon: <CalendarRange style={{ width: "14px" }} />,
      description: "Code block for syntax-highlighted programming snippets.",
    },
  ];
  

  const setStyle = (propName, value) => {
    editBlockProps(path, propName, value);
  };

  const resetStyle = (propsName) => {
    if (Array.isArray(propsName)) {
      propsName.forEach((prop) => {
        editBlockStyle(path, prop, "");
      });
    } else {
      editBlockStyle(path, propsName, "");
    }
  };

  return (
    <ContextMenu onOpenChange={setIsOpen} className="hover:outline-none ">
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent className="w-64 ">
        {BlockType.map((item, i) => (
          <ContextMenuItem
            inset
            value={item.value}
            className={cn(
              "text-[.6rem] flex gap-2 cursor-pointer",
              blockData?.type === item.value &&
                "text-bold underline underline-offset-4"
            )}
            onClick={() => editBlockProps(path, "type", item.value)}
          >
            <div className={cn("absolute left-2 h-4 w-4")}>{item.icon}</div>
            {item.name} 
          </ContextMenuItem>
        ))}

        <ContextMenuSeparator />

        <ContextMenuItem
          inset
          className={"text-[.6rem]"}
          onClick={() => addItem(path)}
        >
          Add Block
          <ContextMenuShortcut>⌘</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          inset
          className={"text-[.6rem]"}
          onClick={() => addIChild(path)}
        >
          Add Child
          <ContextMenuShortcut>⌘</ContextMenuShortcut>
        </ContextMenuItem>

        <ContextMenuItem
          inset
          className={"text-[.6rem]"}
          onClick={() => removeBlock(path)}
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
          <ContextMenuSubTrigger className={"text-[.6rem]"} inset>
            Text
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup
              value={blockData?.props?.style?.color ?? "default"}
            >
              {x_textStyle.map((text) => (
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
          <ContextMenuSubTrigger className={"text-[.6rem]"} inset>
            Color
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup
              value={blockData?.props?.style?.color ?? "default"}
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
                      : setStyle("props.style.color", `text-${color.name}-400`)
                  }
                />
              ))}
            </ContextMenuRadioGroup>
          </ContextMenuSubContent>
        </ContextMenuSub>

        <ContextMenuSub>
          <ContextMenuSubTrigger className={"text-[.6rem]"} inset>
            Background
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuRadioGroup
              value={blockData?.props?.style?.background ?? "default"}
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
                      : setStyle("props.style.background", color.value)
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

const ColorBlock = ({ value, onClick, varient, label, colorName }) => {
  return (
    <ContextMenuRadioItem
      value={value}
      onClick={onClick}
      className={"text-[.6rem]"}
    >
      {varient === "text" ? (
        <div className={cn("rounded-full ", value)}>
          {label || "Aa"} {label ? null : colorName}
        </div>
      ) : (
        <div className="flex gap-2 items-center justify-center">
          <div className={cn("w-3 h-3 rounded-full ", value)}>{label}</div>
          <span style={{ color: value }}>{label ? null : colorName}</span>
        </div>
      )}
    </ContextMenuRadioItem>
  );
};

const TextBlock = ({ value, onClick, varient, label }) => {
  return (
    <ContextMenuRadioItem
      value={value}
      onClick={onClick}
      className={"text-[.6rem]"}
    >
      <div className={cn("rounded-full ")}>Aa {label}</div>
    </ContextMenuRadioItem>
  );
};
