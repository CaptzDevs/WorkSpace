import {
  Rocket,
  Mail,
  ExternalLink,
  CircleSmall,
  X,
  Ellipsis,
  Text,
  Hash,
  CalendarDays,
  Code,
  AlignLeft,
  AlignRight,
  AlignCenter,
  Baseline,
  Underline,
  Italic,
  Palette,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SiReact, SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
import { TextAnimate } from "@/components/magicui/text-animate";
import dayjs from "dayjs";
import React,{ useEffect, useRef, useState } from "react";

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
import { HTML5Backend, getEmptyImage } from "react-dnd-html5-backend";
import ExportToJSON from "@/components/ExportToJSON";
import { SectionContextMenu } from "@/components/SectionContextMenu";
import { SectionDropdown } from "@/components/SectionDropdown";
import { PopoverToolItem } from "@/components/PopoverToolItem";

const TEXT_STYLES = {
  PageHeader: "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl pb-2 text-emerald-400",
  SectionHeader: " text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide text-teal-400",
  Header : "text-sm sm:text-base md:text-lg text-blue-400",
  Text : "text-sm sm:text-base py-1 text-purple-400 ",
};

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



const CV_DATA = {
  sections: [
    {
      value: "Captain Siwakorn",
      type: "text",
      props: {
        // className : "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl",
        style : {
          textAlign : "text-start"
        }
      },
      items: [
        {
          value: "Developer",
          header: true,
          type: "text",
        },
        {
          value:
            "Code, collaborate, and build the future in an optimized environment with the best tools and resources.",
          header: true,
          type: "text",
        },
      ],
    },
    {
      value:  "Education",
      type: "text",
      children: [
        {
          value: "Durations - 21 Mar 2020 - 1 May 2003",
          type: "text",
        }
      ],
      items: [
        {
          value: "Hatyai Technical College",
          type: "text",
          children: [
            {
              value: "2020",
              type: "text",
            },
            
          ],
        },
        {
          value: "Vocational Certificate in Information Technology",
          type: "text",
          children: [
            {
              value: "2020",
              type: "text",
            },
          ],
        },
        {
          value: "High Vocational Certificate in Information Technology",
          type: "text",
          children: [
            {
              value: "2020",
              type: "text",
            },
          ],
        },
        {
          value: "Prince of Songkla University",
          type: "text",
          children: [
            {
              value: "2020",
              type: "text",
            },
          ],
        },
        {
          value: "Bachelor of Information Technology",
          type: "text",
          children: [
            {
              value: "2020",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      value: "Work Experience",
      years: "2020 - 2003",
      type: "text",
      items: [
        {
          value: "Full-stack Web Developer At Me-fi.com",
          years: "2020 - 2024",
          type: "text",
          items: [
            {
              value: "Full-stack Web Developer At Me-fi.com",
              years: "2020 - 2024",
              type: "text",
              children: [
                {
                  value: "2020",
                  type: "text",
                },
              ],
            },
            {
              value: "Full-stack Web Developer At BHH",
              years: "2020 - 2024",
              type: "text",
              items: [
                {
                  value: "Full-stack Web Developer At BHH",
                  years: "2020 - 2024",
                  type: "text",
                  children: [
                    {
                      value: "2020",
                      type: "text",
                    },
                  ],
                },
              ],
              children: [
                {
                  value: "2020",
                  type: "text",
                },
              ],
            },
            {
              value: "Full-stack Web Developer Intern at BHH",
              years: "2020 - 2024",
              type: "text",
              children: [
                {
                  value: "2020",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          value: "Full-stack Web Developer At BHH",
          years: "2020 - 2024",
          type: "text",
          children: [
            {
              value: "2020",
              type: "text",
            },
          ],
        },
        {
          value: "Full-stack Web Developer Intern at BHH",
          years: "2020 - 2024",
          type: "text",
        },
      ],
    },
    {
      value: "Skills",
      type: "text",
      items: [
        {
          value: "Frontend",
          header: true,
          type: "text",
        },
        {
          value: "HTML, CSS, JavaScript",
          type: "text",
        },

        {
          value: "Responsive Design (Tailwind CSS, Bootstrap)",
          type: "text",
        },
        {
          value: "JavaScript Frameworks/Libraries (React.js)",
          type: "text",
        },
        {
          value: "State Management (Redux, Zustand, Context API)",
          type: "text",
        },
        {
          value: "UI/UX Design Principles",
          type: "text",
        },
        {
          value: "Backend",
          type: "text",
          header: true,
        },
        {
          value: "Server-side Languages (Node.js, PHP, Python)",
          type: "text",
        },
        {
          value: "Backend Frameworks (Express.js, Django)",
          type: "text",
        },
        {
          value: "RESTful API & GraphQL",
          type: "text",
        },
        {
          value: "Authentication & Authorization (JWT, OAuth, Passport.js)",
          type: "text",
        },
        {
          value: "SQL Databases (MySQL, PostgreSQL, SQLite)",
          type: "text",
        },
        {
          value: "NoSQL Databases (MongoDB, Firebase, Redis)",
          type: "text",
        },
        {
          value: "Database Query Optimization",
          type: "text",
        },
        {
          value: "WebSockets (Socket.io, WebRTC)",
          type: "text",
        },
        {
          value: "Progressive Web Apps (PWA)",
          type: "text",
        },
      ],
    },
    {
      value: "Project",
      type: "text",

      items: [
        {
          value: "TeleHealth",
          type: "text",
          header: true,
        },
        {
          value:
            "Telehealth refers to the use of digital technology and telecommunications to provide healthcare services remotely. It allows patients to access medical care via the internet, video calls, mobile applications, or IT systems without needing to visit a healthcare facility in person.",
          type: "text",
        },
        {
          value: "Ped Vaccine",
          type: "text",
          header: true,
        },
        {
          value:
            "A Pediatric Vaccine is a digital or automated system designed to track and schedule vaccinations for children. It helps parents and healthcare providers ensure that children receive their vaccines at the correct ages, following national or global immunization schedules.",
          type: "text",
        },
        {
          value: "Pre-Visit Registration",
          type: "text",
          header: true,
        },
        {
          value:
            "A Pre-Visit Registration is an advanced digital platform that allows patients to complete the hospital registration process before arriving for their appointment. This system significantly enhances hospital workflow efficiency, reduces wait times, and improves patient experience.",
          type: "text",
        },
        {
          value: "Support 3 Languages",
          type: "text",
        },
        {
          value: "New patients can be registered",
          type: "text",
        },
        {
          value: "Insurance Request",
          type: "text",
          header: true,
        },
        {
          value:
            "An Insurance Request is a digital solution designed to streamline the process of verifying, requesting, and approving insurance claims for medical services. This system connects patients, hospitals, and insurance providers, ensuring a faster, more accurate, and transparent claim process.",
          type: "text",
        },
      ],
    },
  ],
};

const ItemTypes = {
  SECTION: "section",
  ITEM: "item",
};

const DraggableSection = ({ section, index, moveSection, children , disabled = false }) => {
  const ref = useRef(null);
  const dragHandleRef = useRef(null);
  const { enableDND, setIsDragging } = useSections();

  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover: (draggedItem) => {
      if (draggedItem.index !== index && index > 0) {
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
    canDrag: enableDND && !disabled,
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
        <div className="flex-1" onMouseDown={(e) => e.stopPropagation()}>
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
  path,
  allowCrossSectionDrag,
}) => {
  const { enableDND, setIsDragging , reorderItem , moveItem} = useSections();

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: "ITEM",
    item: { sectionIndex, itemIndex ,path},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: enableDND,
  });

  const [, dropRef] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      const sourcePath = draggedItem.path;
      const targetPath = path;

      console.log(sourcePath, targetPath,'pdataydha');
      

      if (
        (allowCrossSectionDrag || draggedItem.sectionIndex === sectionIndex) &&
        (draggedItem.sectionIndex !== sectionIndex ||
          draggedItem.itemIndex !== itemIndex)
      ) {
        reorderItem(
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
      className={`draggable-item flex items-start justify-start  gap-2 group ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div
        ref={dragRef}
        className="cursor-grab rounded opacity-0 group-hover:opacity-100 px-2"
        onMouseDown={(e) => e.stopPropagation()} // Prevents drag from children clicks
      >
        
        <div > ☰  </div>
   
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
      <SettingBar />
      <div className=" relative w-full md:w-full flex flex-col md:scale-[.6] origin-[50%_0%] px-3">
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
      <ToolBar/>
    </SectionProvider>
  );
}

const HeaderFile = ({ title }) => {
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
};

const Section = ({ children, sectionIndex }) => {
  const [showDelete, setShowDelete] = useState(false);
  const { removeSection, setSelected } = useSections();

  // Select the section

  const selectSection = () => {
    setSelected((prev) => ({ ...prev, sectionIndex }));
  };

  return (
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
   
  );
};

const BlockSummary = ({
  section,
  postFix = "฿",
  calculateFormula = "x",
  condition = "x=true",
}) => {
  const { sections } = useSections();

  const [summaryData, setSummaryData] = useState({
    count: 0,
    sum: 0,
    isNaN: false,
    isAllNaN: false,
  });

  const evaluate = (str, x) => {
    try {
      return new Function("x", `return ${str}`)(x);
    } catch (err) {
      console.error("Evaluation error in formula/condition:", err);
      return 0;
    }
  };

  // Recursively get only nested children values
  const getDeepChildrenValues = (items = []) => {
    let values = [];
  
    items.forEach((item) => {
      const num = Number(item.value);
      if (!isNaN(num)) values.push(num);
  
      if (Array.isArray(item.children)) {
        values.push(...getDeepChildrenValues(item.children));
      }
  
      if (Array.isArray(item.items)) {
        values.push(...getDeepChildrenValues(item.items));
      }
    });
  
    return values;
  };
  

  useEffect(() => {
    if (!Array.isArray(section.items)) return;
  
    const allChildValues = getDeepChildrenValues(section.items);
    const filteredValues = allChildValues.filter((v) => !isNaN(v));
  
    const sum = filteredValues
      .filter((v) => evaluate(condition, v))
      .reduce((acc, val) => acc + evaluate(calculateFormula, val), 0);
  
    setSummaryData({
      count: filteredValues.length,
      sum,
      isNaN: filteredValues.length !== allChildValues.length,
      isAllNaN: filteredValues.length === 0 && allChildValues.length > 0,
    });
  }, [sections]);
  

  if (section.pageHeader) return null;

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

const BlockSummaryAll = ({
  postFix = "฿",
  calculateFormula = "x",
  condition = "x=true",
  ignoreHeader = false,
}) => {
  const { sections } = useSections();

  const [summaryData, setSummaryData] = useState({
    count: 0,
    sum: 0,
    isNaN: false,
    isAllNaN: false,
  });

  const evaluate = (str, x) => new Function("x", `return ${str}`)(x);

  useEffect(() => {
    let sumValue = 0;
    let countValue = 0; // Initialize count value
    let isNaNFound = false;

    sections?.forEach((section) => {
      if (section.items.length > 0) {
        section.items.forEach(({ header, years }) => {
          if (ignoreHeader && header) return;
          const year = Number(years);
          if (isNaN(year)) {
            isNaNFound = true;
            countValue += 1;
          } else if (evaluate(condition, year)) {
            sumValue += evaluate(calculateFormula, year);
            countValue += 1;
          }
        });
      }
    });

    setSummaryData({
      count: countValue,
      sum: sumValue,
      isNaN: isNaNFound,
      isAllNaN: false, //sections.every(({ years }) => isNaN(Number(years))), // Fix the check for all NaN values
    });
  }, [sections]);

/*   useEffect(() => {
    console.log(summaryData);
  }, [summaryData]); */

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


const SectionItem = ({
  path,
  title,
  header = false,
  isEditing,
  item,
  onClick,
}) => {
  const { setSelected, removeItem } = useSections();
  const [showDelete, setShowDelete] = useState(false);

  const selectSectionItem = () => {
    typeof onClick === "function" && onClick(path);
  };

  const getBlockStyle = (item , exceptProps = 'text') => {
    return Object.entries(item?.props?.style || {})
    .filter(([k]) => k !== exceptProps)
    .map(([, v]) => v)
    .join(" ");
  }
  //const sectionItemRef = useClickOutside(() => setSelected( prev =>  ({...prev , sectionIndex: null , itemIndex: null })))
  const sectionItemRef = useClickOutside(() => {});

  const styleClasses = getBlockStyle(item , 'text')
 
  return (
    
    <SectionContextMenu type="item" path={path}>
    <div
      className="w-full flex gap-3 "
      ref={sectionItemRef}
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onClick={selectSectionItem}
      onContextMenu={selectSectionItem}
    >
      <div className="w-full flex items-start justify-start  gap-3 ">
        <div
          className={cn("w-full flex items-start ")}
        >
          {!header && <div className="pr-3">•</div>}

          <EditableItem
            value={title}
            propName={"value"}
            className={"w-full"}
            isEdit={isEditing}
            item={item}
            path={path}
            styleClasses={styleClasses}
            textStyle={TEXT_STYLES[item?.props?.style?.text || "Text"]}
          />
        </div>
        {item?.children?.map((child, index) => {
         
          const styleChildClasses = getBlockStyle(child , 'text')

          return (
          <div className="w-fit h-full  ">
         
   
              <SectionContextMenu type="children" path={[...path, { key: "children", index }]}>
            <EditableItem
              className={"w-max"}
              value={child.value}
              propName={"value"}
              item={item}
              //rules={{format: "number"}}
              path={[...path, { key: "children", index }]}
              styleClasses={styleChildClasses}
              textStyle={TEXT_STYLES[child?.props?.style?.text || "Text"]}
            />
            </SectionContextMenu>

          </div>
        )})}

      </div>

      <div
        className={cn(
          " flex items-center justify-center   cursor-pointer transition-all duration-75",
          showDelete ? "opacity-100" : "opacity-0"
        )}
        onClick={() => removeItem(path)}
      >
        <X />
      </div>
    </div>
    </SectionContextMenu>
  );
};

const EditableItem = ({
  path,
  value,
  propName,
  className,
  styleClasses,
  textStyle,
  isEdit,
  item,
  rules = {
    //format: "number", // Accept only numbers
    replaceWords: { badword: "*****", foo: "bar" }, // Replace words
  },
}) => {
  const [isEditing, setIsEditing] = useState(isEdit);
  const [isFocused, setIsFocused] = useState(isEdit);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const {
    sections,
    addSection,
    addItem,
    handleItemChange,
    saveItem,
    selected,
    setEnableDND,
    removeItem,
    focused,
    setFocused,
    isDragging,
    setSelectedBlock,
  } = useSections();

  useEffect(() => {
    setIsEditing(isEdit);
  }, [isEdit]);

  const inputRef = useClickOutside(() => {
    setIsEditing(false);
    setEnableDND(true);
    setIsFocused(false);
    handleItemChange(path, 'value', inputRef.current.value);
    inputRef.current.blur();
  });

  const containerRef = useClickOutside(() => {
    setIsEditing(false);
    setEnableDND(true);
    setIsFocused(false);
    containerRef.current.blur();
  });

  const editData = (propName) => {
    setIsEditing(true);
    setEnableDND(false);
  };

  const saveData = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleItemChange(path, 'value', e.target.value);
      setIsEditing(false);
      containerRef.current.blur();
      inputRef.current.blur();

      setTimeout(() => {
         addItem(path);
      }, 1);

      setEnableDND(true);
    } else if (e.key === "Escape") {
      setIsEditing(false);
      handleItemChange(path, 'value', e.target.value);
    }
    if (e.key === "Backspace" && e.target.value === "") {
      //! removeItem(path)
      setIsEditing(true);

    }


  };

  const autoResize = (textarea) => {
    textarea.style.height = "auto"; // Reset height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust height based on content
  };

  const handleOnBlur = (e) => {
    handleItemChange(path, 'value', e.target.value);
    setIsEditing(false);
    setEnableDND(true);
    setFocused(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        inputRef.current.value.length,
        inputRef.current.value.length
      ); // Move cursor to the end
    }
  }, [isEditing]);

  const exceptionKey = ["Enter", "Escape"];

  const editFocusedItem = (e) => {
    if (!exceptionKey.includes(e.key) && !e.shiftKey) {
      console.log("dadsada");
      setIsEditing(true);
    }

    if (e.key === "Escape") {
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
 
  const onClickContainer = () =>{
    setSelectedBlock(path);
    setIsOpenDropdown(true)
  }

  const onFocusContainer = () =>{
    setIsFocused(true);
    //setSelectedBlock(path);
    
  }


  return (
    <div
      className={cn(
        className,
        "h-full relative min-w-[30px] flex items-center justify-end  focus:border-b-2  border-neutral-400  focus:bg-neutral-100 dark:focus:bg-neutral-800"
      )}
      tabIndex={0}
      onClick={onClickContainer}
      onDoubleClick={() => editData(propName)}
      onKeyDown={(e) => editFocusedItem(e)}
      onFocus={onFocusContainer}
      ref={containerRef}
    >

    <SectionDropdown_ value={item} isOpen={isEditing}  />
 
    <SectionDropdown path={path} open={isOpenDropdown} onOpenChange={(isOpen) => setIsOpenDropdown(isOpen)}  >
            <div></div>
    </SectionDropdown>

      {isEditing ? (
        <>
          <textarea
            rows={1}
            ref={inputRef}
            defaultValue={value}
            className={cn(
              item?.props?.className,
              textStyle,
              styleClasses,
              "  w-full whitespace-pre-wrap  resize-none break-words  overflow-hidden "
            )}
            onChange={(e) => {
              const newValue = applyRules(e.target.value); // Apply rules on change
              e.target.value = newValue;
              autoResize(e.target);
            }}
            onKeyUp={(e) => saveData(e)}
            onFocus={(e) => autoResize(e.target)}
            onBlur={(e) => handleOnBlur(e)}
          />
        </>
      ) : value ? (
        <div
          className={cn(
            item?.props?.className,
            textStyle,
            styleClasses,
            "w-full whitespace-pre-wrap cursor-pointer break-words overflow-hidden "
          )}
        >
      {/*     <SectionDropdown path={path} ><div >{value}</div></SectionDropdown> */}
          {value}
        </div>
      ) : (
        <div className="w-full h-full hover:border-b border-white min-w-[80px] cursor-pointer">
          &nbsp;
        </div>
      )}
    </div>

  );
};

const SettingBar = () => {
  const {
    setAllowCrossSectionDrag,
    allowCrossSectionDrag,
    enableDND,
    setEnableDND,
    sections,
  } = useSections();

  return (
    <div className="flex items-center justify-center w-full gap-3   p-3">
      <Checkbox
        checked={enableDND}
        onChange={(e) => setEnableDND(e.target.checked)}
      >
        <span className="dark:text-white text-xs">Allow Drag</span>
      </Checkbox>
      <Checkbox
        disabled={!enableDND}
        checked={allowCrossSectionDrag}
        onChange={(e) => setAllowCrossSectionDrag(e.target.checked)}
      >        
      
        <span className="dark:text-white text-xs">
          Allow Drag Cross Section
        </span>
      </Checkbox>
      <ExportToJSON data={sections} />
    </div>
  );
};

const ToolBar = ({asChild = false}) => {
  const {
    setAllowCrossSectionDrag,
    allowCrossSectionDrag,
    enableDND,
    setEnableDND,
    sections,
    selectedBlock,
    getBlock
  } = useSections();


  const [blockData ,setBlockData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(()=>{
    if(selectedBlock){
      setBlockData(getBlock(selectedBlock)?.block)
      setIsOpen(true)
    }else{
      setIsOpen(false)
    }
  },[selectedBlock,sections])

  const tools = {
      textAlign : [
        {
          name : 'Left',
          value : 'text-start',
          icon : <AlignLeft  style={{width : "12px"}}/>,
        },
        {
          name : 'Center',
          value : 'text-center',
          icon : <AlignCenter  style={{width : "12px"}}/>,
        },
        {
          name : 'Right',
          value : 'text-end',
          icon : <AlignRight  style={{width : "12px"}}/>
        }
      ],
      style : [
        {
          name : 'Background',
          value : 'background',
          icon : <Baseline style={{width : "12px"}}/>,
        },
        {
          name : 'Color',
          value : 'color',
          icon : <Baseline style={{width : "12px"}}/>,
        },
        {
          name : 'Underline',
          value : 'underline',
          icon : <Underline style={{width : "12px"}}/>,
        },
        {
          name : 'Italic',
          value : 'italic',
          icon : <Italic style={{width : "12px"}}/>,
        },
      ],
      fontSize : [
        {
          name : 'PageHeader',
          value : 'PageHeader',
          icon : <div className={cn('text-[.6rem]')}> Page </div>,
        },
        {
          name : 'SectionHeader',
          value : 'SectionHeader',
          icon : <div className={cn('text-[.6rem]')}> Section </div>,

        },
        {
          name : 'Header',
          value : 'Header',
          icon : <div className={cn('text-[.6rem]')}> Header </div>,

        },
        {
          name : 'Text',
          value : 'Text',
          icon : <div className={cn('text-[.6rem]')}> Text </div>,

        },
      ]
    }
 
    const classes = {
      default : 'w-fit fixed  bottom-5 left-[50%] transform -translate-x-1/2 flex items-center justify-center gap-3 px-5 py-2 bg-neutral-800 rounded-md',
      asChild : 'w-fit  flex items-center justify-center gap-3 px-5 py-2 bg-neutral-800 rounded-md'
    }

    const isMatch = (field,value) => {
      return (
        blockData?.props?.style?.[field] === value
      );
    }


  return (
    <div className={cn(classes[asChild ? 'asChild' : 'default'] , 'bg-neutral-100 dark:bg-neutral-800 border transition-all duration-150', isOpen ? "opacity-100" : 'opacity-0'  )}>
    {Object.keys(tools).map((tool, i) => (
      <React.Fragment key={i}>
        <div className="flex items-center justify-center gap-2">
          {tools[tool].map((item, j) => (
            <PopoverToolItem>
              <button key={j}  
              className={cn(
              isMatch(tool,item.value) && 'dark:bg-neutral-700', 
              "hover:bg-neutral-400 dark:hover:bg-neutral-700",
              blockData?.props?.style?.[item.value],
              'flex items-center justify-center gap-3 px-3 py-2 rounded-md  cursor-pointer ' )}>
                <span >
                  {item.icon}
                </span>
              </button>
          </PopoverToolItem>
          ))}
        </div>
        {i < Object.keys(tools).length - 1 && <div className="text-neutral-500">|</div>}
      </React.Fragment>
    ))}
   {/*  <pre className="text-[.5rem]"> {JSON.stringify(blockData,null ,2)}</pre> */}
  </div>
  
  );
};

const SectionDropdown_ = ({ isOpen, value, onClose, onClick }) => {
  const { isDragging } = useSections();
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
    onClose(); 
  };
  if (!isOpen || isDragging) return null;

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute bottom-[120%] left-[0%] p-3 bg-neutral-900 flex z-30 gap-3 rounded-md"
      >
            <ToolBar asChild />

{/*         {Object.keys(BLOCK_TYPE).map((key) => {
          const blockType = BLOCK_TYPE[key];
          const icon =
            typeof blockType.icon === "string" ? (
              <span className="text-xl"> {blockType.icon} </span>
            ) : (
              blockType.icon
            );
          const isSelectedValue = value.type === blockType.name;
          return (
            <Button
              variant={"ghost"}
              className={cn(
                isSelectedValue && "border border-neutral-400",
                " flex items-start justify-center flex-col py-5 capitalize text-xl h-fit gap-2 hover:bg-neutral-500"
              )}
              onClick={() => handleClickItem()}
            >
              <div className="flex items-center justify-center gap-2 text-base">
                {icon} {blockType.name}{" "}
              </div>
           
            </Button>
          );
        })} */}
      </motion.div>
    )
  );
};

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
    isDragging,
    setSelectedBlock,
  } = useSections(); // Use context to manage sections and items

 /*  const handleItemClick = (itemPath) => {
    const fullPath = [...itemPath];
    console.log("Full Path of Indices:", fullPath);
    setSelectedBlock(fullPath);
  };
 */
  useEffect(() => {
    const handleAddSection = (e) => {
      if (e.key === "Enter" && selected.sectionIndex === null) {
        addSection();
      }
      if (e.key === "Delete") {
        if (selected.sectionIndex !== null && selected.itemIndex !== null) {
          removeItem(selected.sectionIndex, selected.itemIndex);
        } else if (
          selected.sectionIndex !== null &&
          selected.itemIndex === null
        ) {
          removeSection(selected.sectionIndex);
        }
      }
    };

    window.addEventListener("keydown", handleAddSection);

    return () => {
      window.removeEventListener("keydown", handleAddSection);
    };
  }, [addSection]); // Ensure `addSection` is included in dependencies

  // Recursive function to render items and their children
  const renderItems = (items, sectionIndex, parentPath = []) => {
    return items.map((item, itemIndex) => {
      const currentPath = [...parentPath, { key: "items", index: itemIndex }];

      return (
        <>
      

        <DraggableItem
          path={currentPath}
          key={itemIndex}
          item={item}
          sectionIndex={sectionIndex}
          itemIndex={itemIndex}
          moveItem={reorderItem}
          allowCrossSectionDrag={allowCrossSectionDrag}
        >
          <SectionItem
            path={currentPath}
            title={item.value}
            header={item?.props?.style?.text === 'Header'}
            isEditing={item.isEditing}
            item={item}
          />
          {/* Recursively render nested items if they exist */}
          {item.items &&
            renderItems(item.items, sectionIndex, currentPath)}{" "}
          {/* Passing the current path */}
        </DraggableItem>
          </>
      );
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <motion.div
        className="flex items-start justify-start flex-col w-full h-fit"
        {...sectionMotionProps}
      >
        {sections?.map((section, index) => (
          <DraggableSection
            key={index}
            section={section}
            index={index}
            moveSection={reorderSection}
            disabled = {index === 0}
          >
            <motion.div
              {...sectionMotionProps}
              transition={{ duration: 0.8, ease: "easeOut" }}
              key={index}
            >
              <Section sectionIndex={index}>
                <SectionItem 
                    item={section}
                    path={[ { key: "section", index: index }]}
                    sectionIndex={index}
                    section={section}
                    title={section.value}
                    header={section?.props?.style?.text === 'PageHeader' || section?.props?.style?.text === 'SectionHeader'}
                    isEditing={section.isEditing}
                  />

                  {renderItems(section.items, index, [{ key: "section", index: index }])}
                
                <BlockSummary sectionIndex={index} section={section} />
                <button
                  tabIndex={-1}
                  onClick={() => addItem([{key: "section", index: index}])}
                  className="text-blue-500 mt-2 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 h-10 rounded-sm transition-all duration-100"
                >
                  {/* Add Item */}
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

const NewSectionItem = () => {
  return (
    <div className="flex items-center justify-between w-full gap-5">
      <Checkbox
        checked={item.header}
        onChange={(e) =>
          handleItemChange(index, itemIndex, "header", e.target.checked)
        }
      >
        <span className="dark:text-white text-base">Header</span>
      </Checkbox>
      |
      <input
        className="w-full"
        type="text"
        placeholder="Title"
        value={item.title}
        autoFocus
        onChange={(e) =>
          handleItemChange(index, itemIndex, "title", e.target.value)
        }
      />
      <input
        className=" w-1/3 "
        type="text"
        placeholder="Years"
        value={item.years}
        onChange={(e) =>
          handleItemChange(index, itemIndex, "years", e.target.value)
        }
      />
      <button
        className="w-full flex justify-end text-blue-400 hover:text-neutral-400 cursor-pointer rounded-sm"
        onClick={() => saveItem(index, itemIndex)}
      >
        Save Item
      </button>
    </div>
  );
};
