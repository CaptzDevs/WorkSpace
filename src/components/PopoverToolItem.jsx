import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useSections } from "@/context/SectionContext"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function PopoverToolItem({ children }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-fit" sideOffset={10}>
        <PopoverColors/>

      </PopoverContent>
    </Popover>
  )
}


const  PopoverColors = () =>{
  const { sections , colors,getBlock , selectedBlock ,editBlockProps  } = useSections()
  const [blockData, setBlockData] = useState(null);

  const [selectedValue , setSelectedValue] = useState(null);

  useEffect(()=>{
    if(selectedBlock){
      const d = getBlock(selectedBlock).block;
      setSelectedValue(d?.props?.style?.color);
    }
  },[])

  const setStyle = (propName, value) => {
    editBlockProps(selectedBlock, propName, value);
    setSelectedValue(value);
  };
  
  return <div className="flex flex-wrap gap-1">
    {colors.map((item , i) => (
      <div key={i} 
      className={cn("w-fit text-[.8rem] hover:bg-neutral-800 p-2 rounded-md cursor-pointer" ,selectedValue === item.value && 'bg-neutral-700')} 
      onClick={()=>setStyle("props.style.color", item.value)}>

              <div className={cn("rounded-full ", item.value)}>
                {item.label || "Aa"} {item.label ? null : item.colorName}
              </div>

    </div>))}
  </div>
}


const  PopoverBackground = ({varient = 'text'}) =>{
  const { colors,backgroundColors} = useSections()

  return <div className="flex flex-wrap gap-3">
    {colors.map((item , i) => (
      <div key={i} className="w-fit">
           {varient === "text" ? (
              <div className={cn("rounded-full ", item.value)}>
                {item.label || "Aa"} {item.label ? null : item.colorName}
              </div>
            ) : (
              <div className="flex gap-2 items-center justify-center">
                <div className={cn("w-3 h-3 rounded-full ", item.value)}>{item.label}</div>
                <span style={{ color: item.value }}>{label ? null : colorName}</span>
              </div>
            )}
    </div>))}
  </div>
}