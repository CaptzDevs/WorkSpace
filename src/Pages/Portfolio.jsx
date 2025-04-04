import { Rocket, Mail, ExternalLink, CircleSmall, X, Ellipsis, Text, Hash, CalendarDays, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SiReact, SiGithub } from "@icons-pack/react-simple-icons";
import {  motion } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";

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
import { cn } from "@/lib/utils";
import { Checkbox, Divider } from "antd";
import { useSections, SectionProvider } from "@/context/SectionContext";
import useClickOutside from "@/hooks/useClickOutside";

import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend ,getEmptyImage } from "react-dnd-html5-backend";
import ExportToJSON from "@/components/ExportToJSON";
import { SectionContextMenu } from "@/components/SectionContextMenu";

const TextStyle = {
  pageHeader : 'text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl pb-2',
  header : 'text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl',
}

const BLOCK_TYPE = {
  text: {
    name: "Text",
    icon: <Text />,
    description: "Plain text block for entering and formatting text.",
  },
  number: {
    name: "Number",
    icon: <Hash />,
    description: "Numeric block for storing and calculating numbers.",
  },
  calendar: {
    name: "Calendar",
    icon: <CalendarDays />,
    description: "Date selector for scheduling or timestamping events.",
  },
  code: {
    name: "Code",
    icon: <Code />,
    description: "Code block for syntax-highlighted programming snippets.",
  },
};

const WIDGET_TYPE = {
    calendar : 'calendar',
}

const CV_DATA = {

  sections: [
     {
       title : "Captain Siwakorn",
       pageHeader : true,
       type : 'text',
       props : {
        // className : "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl",
       
       },
      items : [
        {
          title: "Developer",
          header: true,
          type : 'text'
      
        },
        {
          title: "Code, collaborate, and build the future in an optimized environment with the best tools and resources.",
          header: true,
          type : 'text'
        },
      ]
    },
    {
      title: "Education",
      years : "Durations - 21 Mar 2020 - 1 May 2003",
      type : 'text',
      items: [
        {
          title: "Hatyai Technical College",
          years: "2020",
          type : 'text',
          header: true,
        },
        {
          title: "Vocational Certificate in Information Technology",
          years: "2020",
          type : 'text',
        },
        {
          title: "High Vocational Certificate in Information Technology",
          years: "2020",
          type : 'text',
        },
        {
          title: "Prince of Songkla University",
          years: "2020",
          type : 'text',
          header: true,
        },
        {
          title: "Bachelor of Information Technology",
          years: "2020",
          type : 'text',
        },
      ],
    },
    {
      title: "Work Experience",
      years : "2020 - 2003",
      type : 'text',
      items: [
        {
          title: "Full-stack Web Developer At Me-fi.com",
          years: "2020 - 2024",
          type : 'text',

        },
        {
          title: "Full-stack Web Developer At BHH",
          years: "2020 - 2024",
          type : 'text',
        },
        {
          title: "Full-stack Web Developer Intern at BHH",
          years: "2020 - 2024",
          type : 'text',

        },
      ],
    },
    {
      title: "Skills",
      type : 'text',
      items: [
        {
          title: "Frontend",
          header: true,
          type : 'text',
        },
        {
          title: "HTML, CSS, JavaScript",
          type : 'text',
        },
        {
          title: "Responsive Design (Tailwind CSS, Bootstrap)",
          type : 'text',
        },
        {
          title: "JavaScript Frameworks/Libraries (React.js)",
          type : 'text',
        },
        {
          title: "State Management (Redux, Zustand, Context API)",
          type : 'text',
        },
        {
          title: "UI/UX Design Principles",
          type : 'text',
        },
        {
          title: "Backend",
          type : 'text',
          header: true,
        },
        {
          title: "Server-side Languages (Node.js, PHP, Python)",
          type : 'text',
        },
        {
          title: "Backend Frameworks (Express.js, Django)",
          type : 'text',
        },
        {
          title: "RESTful API & GraphQL",
          type : 'text',
        },
        {
          title: "Authentication & Authorization (JWT, OAuth, Passport.js)",
          type : 'text',
        },
        {
          title: "SQL Databases (MySQL, PostgreSQL, SQLite)",
          type : 'text',
        },
        {
          title: "NoSQL Databases (MongoDB, Firebase, Redis)",
          type : 'text',
        },
        {
          title: "Database Query Optimization",
          type : 'text',
        },
        {
          title: "WebSockets (Socket.io, WebRTC)",
          type : 'text',
        },
        {
          title: "Progressive Web Apps (PWA)",
          type : 'text',
        },
      ],
    },
    {
      title: "Project",
      type : 'text',

      items: [
        {
          title: "TeleHealth",
          type : 'text',
          header: true,
        },
        {
          title: "Telehealth refers to the use of digital technology and telecommunications to provide healthcare services remotely. It allows patients to access medical care via the internet, video calls, mobile applications, or IT systems without needing to visit a healthcare facility in person.",
          type : 'text',

        },
        {
          title: "Ped Vaccine",
          type : 'text',
          header: true,
        },
        {
          title:"A Pediatric Vaccine is a digital or automated system designed to track and schedule vaccinations for children. It helps parents and healthcare providers ensure that children receive their vaccines at the correct ages, following national or global immunization schedules.",
          type : 'text',

        },
        {
          title: "Pre-Visit Registration",
          type : 'text',
          header: true,
        },
        {
          title: "A Pre-Visit Registration is an advanced digital platform that allows patients to complete the hospital registration process before arriving for their appointment. This system significantly enhances hospital workflow efficiency, reduces wait times, and improves patient experience.",
          type : 'text',

        },
        {
          title: "Support 3 Languages",
          type : 'text',

        },
        {
          title: "New patients can be registered",
          type : 'text',

        },
        {
          title: "Insurance Request",
          type : 'text',
          header: true,
        },
        {
          title: "An Insurance Request is a digital solution designed to streamline the process of verifying, requesting, and approving insurance claims for medical services. This system connects patients, hospitals, and insurance providers, ensuring a faster, more accurate, and transparent claim process.",
          type : 'text',

        },
      ],
    },
  ],
};

const ItemTypes = {
  SECTION: "section",
  ITEM: "item",
};

const DraggableSection = ({ section, index, moveSection, children }) => {
  const ref = useRef(null);
  const dragHandleRef = useRef(null);
  const { enableDND, setIsDragging } = useSections();

  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.SECTION,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: enableDND,
  });

  // Connect drop to whole section
  drop(ref);

  // Connect drag only to the handle
  useEffect(() => {
    if (dragHandleRef.current) {
      drag(dragHandleRef);
    }
  }, [drag]);

  useEffect(() => {
    if (setIsDragging) {
      setIsDragging(isDragging);
    }
  }, [isDragging, setIsDragging]);

  useEffect(() => {
    if (preview) {
      preview(getEmptyImage(), { captureDraggingState: true });
    }
  }, [preview]);

  return (
    <div
      ref={ref}
      className={`draggable-section  p-2 mb-2 rounded-xl  ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-start gap-2 group">
        <div
          ref={dragHandleRef}
          className="cursor-grab p-2 rounded opacity-0 group-hover:opacity-100"
          onMouseDown={(e) => e.stopPropagation()}
        >
          ☰
        </div>
        <div
          className="flex-1"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
const DraggableItem = ({
  children,
  sectionIndex,
  itemIndex,
  item,
  moveItem,
  allowCrossSectionDrag,
}) => {
  const { enableDND, setIsDragging } = useSections();

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: "ITEM",
    item: { sectionIndex, itemIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: enableDND,
  });

  const [, dropRef] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      if (
        (allowCrossSectionDrag || draggedItem.sectionIndex === sectionIndex) &&
        (draggedItem.sectionIndex !== sectionIndex ||
          draggedItem.itemIndex !== itemIndex)
      ) {
        moveItem(
          draggedItem.sectionIndex,
          draggedItem.itemIndex,
          sectionIndex,
          itemIndex
        );
        draggedItem.sectionIndex = sectionIndex;
        draggedItem.itemIndex = itemIndex;
      }
    },
  });

  useEffect(() => {
    if (setIsDragging) {
      setIsDragging(isDragging);
    }
  }, [isDragging, setIsDragging]);

  useEffect(() => {
    if (previewRef) {
      previewRef(getEmptyImage(), { captureDraggingState: true }); // Hide default preview
    }
  }, [previewRef]);

  return (
    <div
      ref={dropRef}
      className={`draggable-item flex items-center gap-2 group ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        ref={dragRef}
        className="cursor-grab  rounded opacity-0 group-hover:opacity-100 px-2"
        onMouseDown={(e) => e.stopPropagation()} // Prevents drag from children clicks
      >
        ☰ 
      </div>

      <div
        className="flex-1"
        onMouseDown={(e) => e.stopPropagation()} // Stops drag when clicking children
      >
        {children}
      </div>
    </div>
  );
};

const sectionMotionProps = {
  className: "w-full",
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  //transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true }, // Ensures animation triggers only once
};

export default function Portfolio() {
  return (
    <SectionProvider data={CV_DATA}>
      <ToolBar/>
      <div className=" w-full md:w-full flex flex-col md:scale-[.6] origin-[50%_0%] px-3">
     {/*    <div className="w-full flex items-start justify-center flex-col  bg-natural-100 gap-3 py-10 rounded-md z-40">
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
        </div> */}
      
        <RenderData />
      </div>
    </SectionProvider>
  );
}

const HeaderFile = ({title}) => {
  return (
    <div className="flex items-start justify-start  gap-3">
    <div
      className={
        "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl"
      }
    >
      {title}
    </div>
  </div>
  );
}

const Section = ({ children, sectionIndex , }) => {
  const [showDelete, setShowDelete] = useState(false);
  const { removeSection, setSelected } = useSections();

  // Select the section


  const selectSection = () => {
    setSelected((prev) => ({ ...prev, sectionIndex }));
  };

  return (
    <SectionContextMenu>

    <div
    className="w-full flex flex-col gap-4 relative" 
    onMouseOver={() => setShowDelete(true)}
    onMouseLeave={() => setShowDelete(false)}
    onClick={selectSection}
    >
      <div className="w-full flex flex-col gap-3">{children}</div>

 {/*      {showDelete && (
        <div
          className="flex items-center justify-center cursor-pointer absolute top-0 right-0 w-6 h-6"
          onClick={(e) => {
            e.stopPropagation(); // Prevent section selection
            removeSection(sectionIndex);
          }}
        >
          <X />
        </div>
      )} */}
    </div>
    </SectionContextMenu>
  );
};

const BlockSummary = ({ 
  section,
   sectionIndex,
   postFix = '฿',
   calculateFormula = 'x',
   condition = 'x=true' ,
   ignoreSectionHeader = true,
   ignoreHeader = false 
  
  }) => {

  const { getBlockData ,
     sections } = useSections();

  const [summaryData ,
     setSummaryData] = useState({
    count: 0,

    sum: 0,
    isNaN: false,
    isAllNaN: false,
  });

  const evaluate = (str, x) => new Function('x', `return ${str}`)(x);
/* 
  useEffect(() => {
    let sumValue = 0;
    let countValue = 0; // Initialize count value
    let isNaNFound = false;

    sectionItems.forEach(({ header, years }) => {
      if (ignoreHeader && header) return;
      const year = Number(years);
      if (isNaN(year)) {
        isNaNFound = true;
        countValue += 1; // Increment count for NaN values
      } else if (evaluate(condition, year)) {
        sumValue += evaluate(calculateFormula, year);
        countValue += 1; // Increment count for valid years
      }
    });

    setSummaryData({
      count: countValue,
      sum: sumValue,
      isNaN: isNaNFound,
      isAllNaN: sectionItems.every(({ years }) => isNaN(Number(years))), // Fix the check for all NaN values
    });
  }, [sections]); */


  useEffect(() => {
    let sumValue = 0;
    let countValue = 0; // Initialize count value
    let isNaNFound = false;


      if(section.items.length > 0 ){
        section.items.forEach(({ header , years},index) =>{
      if (ignoreHeader && header) return;
        const year = Number(years);
        if (isNaN(year)) {
          isNaNFound = true;
        countValue += 1;
      } else if (evaluate(condition, year)) {
        sumValue += evaluate(calculateFormula, year);
        countValue += 1; 
      }
      if(section.items.length  === index+1 && !ignoreSectionHeader){
        console.log('d1')
        sumValue += isNaN(Number(section.years)) ? 0 : evaluate(calculateFormula, Number(section.years));
        countValue += 1; 
      }
    })
    }

    setSummaryData({
      count: countValue,
      sum: sumValue,
      isNaN: isNaNFound,
      isAllNaN: section.items.every(({ years }) => isNaN(Number(years))) && 
      (!ignoreSectionHeader || isNaN(Number(section.years)))
// Fix the check for all NaN values
    });
  }, [sections]);
  

  if (section.pageHeader) return null;

  // Display both sum and count values
  return (
    <div className="flex justify-between pr-8">
      <span>Count: {summaryData.count.toLocaleString()}</span>
      {!summaryData.isAllNaN && (
        <span>
          Sum: {summaryData.sum.toLocaleString()} {postFix}
        </span>
      )}
    </div>
  );
};

const BlockSummaryAll = ({ postFix = '฿', calculateFormula = 'x', condition = 'x=true', ignoreHeader = false }) => {
  const {  sections } = useSections();

  const [summaryData , setSummaryData] = useState({
    count: 0,
    sum: 0,
    isNaN: false,
    isAllNaN: false,
  });

  const evaluate = (str, x) => new Function('x', `return ${str}`)(x);

  useEffect(() => {
    let sumValue = 0;
    let countValue = 0; // Initialize count value
    let isNaNFound = false;

    sections.forEach(( section ) => {
      
      if(section.items.length > 0 ){
        section.items.forEach(({ header , years}) =>{

          
      if (ignoreHeader && header) return;
        const year = Number(years);
        if (isNaN(year)) {
          isNaNFound = true;
        countValue += 1;
      } else if (evaluate(condition, year)) {
        sumValue += evaluate(calculateFormula, year);
        countValue += 1; 
      }
    })
    }
    });

    setSummaryData({
      count: countValue,
      sum: sumValue,
      isNaN: isNaNFound,
      isAllNaN: false //sections.every(({ years }) => isNaN(Number(years))), // Fix the check for all NaN values
    });
  }, [sections]);

  useEffect(()=>{
    console.log(summaryData)
  },[summaryData])

  // Display both sum and count values
  return (
    <div className="flex justify-between pr-8">
      <span>Count: {summaryData.count.toLocaleString()}</span>
      {!summaryData.isAllNaN && (
        <span>
          Sum: {summaryData.sum.toLocaleString()} {postFix}
        </span>
      )}
    </div>
  );
};






const SectionHeader = ({ children , item , sectionIndex  }) => {

  const {setSelected , removeSection} = useSections();

  const selectSection = () => {
    setSelected({ sectionIndex , itemIndex: null });
  };

  const editData = (propName) => {
    selectSection()
  }
  const [showDelete, setShowDelete] = useState(false);

  return (

          <div
          className="w-full flex gap-3 "
          onClick={editData}
          onContextMenu={selectSection}
          onMouseOver={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
          >
          <div
            className="w-full flex items-center justify-center  text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide gap-3  "
          >
            <div
              className={cn("w-full flex items-start ")}
            >
              <EditableItem
                sectionIndex={sectionIndex}
                value={item.title}
                propName={"title"}
                className={"w-full"}
                item={item}
              />
            </div>

            <div className="w-fit h-full  text-xs sm:text-sm md:text-base">
            <SectionContextMenu type='2'>
              <EditableItem
                className={"w-max flex items-center justify-center"}
                sectionIndex={sectionIndex}
                value={item.years}
                propName={"years"}
                item={item}
                />
                </SectionContextMenu>
            </div>
          </div>

            <div className={cn(' flex items-center justify-center   cursor-pointer transition-all duration-75' , showDelete ? "opacity-100" : 'opacity-0')}
              onClick={()=> removeSection(sectionIndex)}
            >
              <X />
            </div>
          </div>
  );
};

const SectionItem = ({
  sectionIndex,
  itemIndex,
  title,
  years,
  header = false,
  isEditing,
  item,
}) => {
  const { setSelected , removeItem } = useSections();
  const [showDelete, setShowDelete] = useState(false);

  const selectSectionItem = () => {
    setSelected({ sectionIndex, itemIndex });
  };

  //const sectionItemRef = useClickOutside(() => setSelected( prev =>  ({...prev , sectionIndex: null , itemIndex: null }))) 
  const sectionItemRef = useClickOutside(()=>{});
  
  return (
    <div
      className="w-full flex gap-3 "
      ref={sectionItemRef}
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={selectSectionItem}
      onContextMenu={selectSectionItem}
    >
      <div className="w-full flex items-start justify-start text-sm sm:text-base md:text-lg gap-3 ">
        <div
          className={cn("w-full flex items-start ", header && "font-bold pr-0")}
        >
          {!header && <div className="pr-3">•</div>}

          <EditableItem
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            value={title}
            propName={"title"}
            className={"w-full"}
            isEdit={isEditing}
            item={item}
          />
        </div>
        <div className="w-fit h-full text-xs sm:text-sm md:text-base">
          <EditableItem
            className={"w-max"}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            value={years}
            propName={"years"}
            item={item}
            //rules={{format: "number"}}
          />
        </div>
      </div>

      <div
        className={cn(
          " flex items-center justify-center   cursor-pointer transition-all duration-75",
          showDelete ? "opacity-100" : "opacity-0"
        )}
        onClick={() => removeItem(sectionIndex, itemIndex)}
      >
        <X />
      </div>

    </div>
  );
};

const EditableItem = ({
  sectionIndex,
  itemIndex,
  value,
  propName,
  className,
  isEdit,
  item,
  rules={
    //format: "number", // Accept only numbers
    replaceWords: { "badword": "*****", "foo": "bar" }, // Replace words
  }

}) => {
  const [isEditing, setIsEditing] = useState(isEdit);
  const [isFocused, setIsFocused] = useState(isEdit);

  const {
    sections,
    addSection,
    addItem,
    handleItemChange,
    saveItem,
    selected,
    setEnableDND ,
    removeItem,
    focused, setFocused,
    isDragging,
  } = useSections();

  useEffect(()=>{
    setIsEditing(isEdit)
  },[isEdit])

  const inputRef = useClickOutside(() => {
    setIsEditing(false);
    setEnableDND(true)
    setIsFocused(false)
    handleItemChange(sectionIndex, itemIndex, propName, inputRef.current.value);
    inputRef.current.blur();
  });
  
  const containerRef = useClickOutside(() => {
    setIsEditing(false);
    setEnableDND(true)
    setIsFocused(false)
    containerRef.current.blur();
  });
  
  
  const editData = (propName) => {
    setIsEditing(true);
    setEnableDND(false)
  };

  const saveData = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setIsEditing(false);
      handleItemChange(sectionIndex, itemIndex, propName, e.target.value);
      containerRef.current.blur();
      inputRef.current.blur();

      setTimeout(() => {
        addItem(sectionIndex ,itemIndex);
      }, 1);
      setEnableDND(true)
    }else if (e.key === "Escape" ) {
      setIsEditing(false)
      handleItemChange(sectionIndex, itemIndex, propName, e.target.value);

    }

    if(e.key === 'Backspace' && e.target.value === '' ){
      removeItem(sectionIndex, itemIndex)
    }
  };

  const autoResize = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content

  };

  const handleOnBlur = (e) => {
    handleItemChange(sectionIndex, itemIndex, propName, e.target.value);
    setIsEditing(false)
    setEnableDND(true)
    setFocused(false)
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      ); // Move cursor to the end
    }
  }, [isEditing]);


  const exceptionKey = ['Enter', 'Escape', 'Backspace'];

  const editFocusedItem = (e) => {
    if (!exceptionKey.includes(e.key) && !e.shiftKey) {
      console.log('dadsada')
      setIsEditing(true);
    }
    
    if (e.key === 'Escape') {
      containerRef.current.blur();
    }
  
  };


  const applyRules = (text) => {
    let modifiedText = text;
    
    // Apply custom rules if they exist
    if (rules.maxLength && modifiedText.length > rules.maxLength) {
      modifiedText = modifiedText.slice(0, rules.maxLength);
    }

    if (rules.toUpperCase) {
      modifiedText = modifiedText.toUpperCase();
    }

    if (rules.replaceWords) {
      Object.entries(rules.replaceWords).forEach(([key, value]) => {
        modifiedText = modifiedText.replace(new RegExp(key, "g"), value);
      });
    }

       // Apply format rule (e.g., only numbers)
       if (rules.format === "number") {
        modifiedText = modifiedText.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      }
  
      if (rules.format === "decimal") {
        modifiedText = modifiedText.replace(/[^0-9.]/g, ""); // Allow only numbers and dots
      }
  
      if (rules.format === "alphanumeric") {
        modifiedText = modifiedText.replace(/[^a-zA-Z0-9]/g, ""); // Allow only letters and numbers
      }
  
      return modifiedText;
  };


  const styleClasses = Object.values(item?.props?.style || {}).join(' ');


  return (
<div className={cn(className, 'h-full relative focus:border-b-2 min-w-[30px] flex items-center justify-end   border-neutral-400  focus:bg-neutral-100 dark:focus:bg-neutral-800')} 
  tabIndex={0}
  onDoubleClick={() => editData(propName)}  
  onKeyDown={(e) => editFocusedItem(e)}
  onFocus={()=>setIsFocused(true)}
  
  ref={containerRef}
>
  
{/*   <SectionDropdown value={item} isOpen={isFocused && !isEditing && !isDragging} onClose={()=> {
    console.log('dada')
    setIsFocused(false)
  }} />
 */}
  {isEditing ? (<>
    <textarea
      rows={1}
      ref={inputRef}          
      defaultValue={value}
      className={cn(item?.props?.className, item.pageHeader && TextStyle['pageHeader'],  '  w-full whitespace-pre-wrap  resize-none break-words  overflow-hidden')}
      onChange={(e) => {
        const newValue = applyRules(e.target.value); // Apply rules on change
        e.target.value = newValue;
        autoResize(e.target);
      }}
      onKeyDown={(e) => saveData(e)}
      onFocus={(e) => autoResize(e.target)}
      onBlur={(e) => handleOnBlur(e)}
      />
 

      </>
  ) : value ? (
    <div 
      className={
      cn(
        item?.props?.className,
        item.pageHeader && TextStyle['pageHeader'], 
        styleClasses,
        'w-full whitespace-pre-wrap cursor-pointer break-words overflow-hidden ')} 
    >
      {value}
    </div>
  ) : (
    <div className="w-full h-full hover:border-b border-white min-w-[80px] cursor-pointer">&nbsp;</div>
  )}

</div>

  );
};


const ToolBar = () =>{
  const {setAllowCrossSectionDrag, allowCrossSectionDrag , enableDND, setEnableDND , sections} = useSections();

  return <div className="flex items-center justify-center w-full gap-3   p-3">
       <Checkbox checked={enableDND} onChange={(e) => setEnableDND(e.target.checked)}> 
     <span className="dark:text-white text-xs" >
           Allow Drag  
      </span>
      </Checkbox>
      <Checkbox disabled={!enableDND} checked={allowCrossSectionDrag} onChange={(e) => setAllowCrossSectionDrag(e.target.checked)}> 
     <span className="dark:text-white text-xs" >
           Allow Drag Cross Section 
      </span>
      </Checkbox>
  
      <ExportToJSON data={sections}/>
  </div>
}

const SectionDropdown = ({isOpen ,value, onClose , onClick}) =>{
  const { isDragging } = useSections()
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup when component unmounts
    };
  }, [isOpen]);

  const handleClickItem = () => {
    console.log('313131')
    onClose(); // Close dropdown after selecting an item
  };
  if (!isOpen || isDragging) return null;

  return isOpen && <motion.div 
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2, ease: "easeOut" }}

  className="absolute top-[120%] left-[0%] p-3 bg-neutral-900 flex flex-col z-30 gap-3 rounded-md">
    {Object.keys(BLOCK_TYPE).map(key =>{
        const blockType = BLOCK_TYPE[key]
        const icon = typeof blockType.icon === 'string' ? <span className="text-xl"> {blockType.icon} </span> : blockType.icon
        const isSelectedValue = value.type === blockType.name
       return <Button 
       variant={'ghost'}
        className={cn(isSelectedValue && 'border border-neutral-400',' flex items-start justify-center flex-col py-5 capitalize text-xl h-fit gap-2 hover:bg-neutral-500')}
        onClick={()=> handleClickItem()}
        > 
        <div className="flex items-center justify-center gap-2">  {icon} {blockType.name}  </div>
        <span className="text-sm opacity-70">{blockType.description}</span>
         </Button>
    })}

</motion.div>
}

const RenderData = () => {
  const {
    sections,
    addSection,
    addItem,
    handleItemChange,
    saveItem,
    reorderItem,
    reorderSection,
    allowCrossSectionDrag,
    setAllowCrossSectionDrag,
    selected,
    removeItem,
    removeSection,
    isDragging
  } = useSections(); // Use context to manage sections and items

  useEffect(() => {
    const handleAddSection = (e) => {
      if (e.key === "Enter" && selected.sectionIndex === null) {
        addSection();
      }
      if (e.key === "Delete" ) {
        if(selected.sectionIndex !== null && selected.itemIndex !== null){
          removeItem(selected.sectionIndex, selected.itemIndex);
        }else if(selected.sectionIndex !== null && selected.itemIndex === null){
          removeSection(selected.sectionIndex);
        }
      }
    };
    
    window.addEventListener("keydown", handleAddSection);
  
    return () => {
      window.removeEventListener("keydown", handleAddSection);
    };
  }, [addSection]); // Ensure `addSection` is included in dependencies
  

  return (

    <DndProvider backend={HTML5Backend}>


      <motion.div
        className="flex items-start justify-start flex-col w-full h-fit"
        {...sectionMotionProps}
        >

        {sections.map((section, index) => (
          <DraggableSection
            key={index}
            section={section}
            index={index}
            moveSection={reorderSection}
            >
            <motion.div {...sectionMotionProps}
             transition = { { duration: 0.8, ease: "easeOut" }}
            key={index}>
           
              <Section sectionIndex={index}>
                <SectionHeader 
                  sectionIndex={index} 
                  title={section.title} 
                  pageHeader={section.pageHeader} 
                  item={section} 
                  >
                    {section.title}
                </SectionHeader>
                {section.items.map((item, itemIndex) => (
                  <DraggableItem
                    key={itemIndex}
                    item={item}
                    sectionIndex={index}
                    itemIndex={itemIndex}
                    moveItem={reorderItem}
                    allowCrossSectionDrag={allowCrossSectionDrag} // Pass the flag
                  >
                      <SectionItem
                        sectionIndex={index}
                        itemIndex={itemIndex}
                        title={item.title}
                        years={item.years}
                        header={item?.props?.header || item?.header}
                        isEditing={item.isEditing}
                        item={item}
                      />

                  </DraggableItem>
                ))}
           
              <BlockSummary sectionIndex={index} section={section} />
              <button
                  tabIndex={-1}
                  onClick={() => addItem(index)}
                  className="text-blue-500 mt-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 h-10 rounded-sm transition-all duration-100"
                >
                </button>
              </Section>
              <Divider />
            </motion.div>
          </DraggableSection>
        ))}
      <BlockSummaryAll />
        <button
          onClick={addSection}
          className="text-blue-500 mt-5 cursor-pointer"
        >
          Add Section
        </button>

      </motion.div>
    </DndProvider>
  );
};


const NewSectionItem = ( ) =>{
  return  <div className="flex items-center justify-between w-full gap-5">
  <Checkbox
    checked={item.header}
    onChange={(e) =>
      handleItemChange(
        index,
        itemIndex,
        "header",
        e.target.checked
      )
    }
  >
    <span className="dark:text-white text-base">
      Header
    </span>
  </Checkbox>
  |
  <input
    className="w-full"
    type="text"
    placeholder="Title"
    value={item.title}
    autoFocus
    onChange={(e) =>
      handleItemChange(
        index,
        itemIndex,
        "title",
        e.target.value
      )
    }
  />
  <input
    className=" w-1/3 "
    type="text"
    placeholder="Years"
    value={item.years}
    onChange={(e) =>
      handleItemChange(
        index,
        itemIndex,
        "years",
        e.target.value
      )
    }
  />
  <button
    className="w-full flex justify-end text-blue-400 hover:text-neutral-400 cursor-pointer rounded-sm"
    onClick={() => saveItem(index, itemIndex)}
  >
    Save Item
  </button>
</div>
}