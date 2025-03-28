import { Rocket, Mail, ExternalLink, CircleSmall, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SiReact, SiGithub } from "@icons-pack/react-simple-icons";
import { motion } from "framer-motion";
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
import { HTML5Backend } from "react-dnd-html5-backend";
import ExportToJSON from "@/components/ExportToJSON";

const CV_DATA = {
  sections: [
    {
      title: "Education",
      items: [
        {
          title: "Hatyai Technical College",
          years: "2020 - 2024",
          header: true,
        },
        {
          title: "Vocational Certificate in Information Technology",
          years: "2020 - 2024",
        },
        {
          title: "High Vocational Certificate in Information Technology",
          years: "2020 - 2024",
        },
        {
          title: "Prince of Songkla University",
          years: "2020 - 2024",
          header: true,
        },
        {
          title: "Bachelor of Information Technology",
          years: "2020 - 2024",
        },
      ],
    },
    {
      title: "Work Experience",
      items: [
        {
          title: "Full-stack Web Developer At Me-fi.com",
          years: "2020 - 2024",
        },
        {
          title: "Full-stack Web Developer At BHH",
          years: "2020 - 2024",
        },
        {
          title: "Full-stack Web Developer Intern at BHH",
          years: "2020 - 2024",
        },
      ],
    },
    {
      title: "Skills",
      items: [
        {
          title: "Frontend",
          header: true,
        },
        {
          title: "HTML, CSS, JavaScript",
        },
        {
          title: "Responsive Design (Tailwind CSS, Bootstrap)",
        },
        {
          title: "JavaScript Frameworks/Libraries (React.js)",
        },
        {
          title: "State Management (Redux, Zustand, Context API)",
        },
        {
          title: "UI/UX Design Principles",
        },
        {
          title: "Backend",
          header: true,
        },
        {
          title: "Server-side Languages (Node.js, PHP, Python)",
        },
        {
          title: "Backend Frameworks (Express.js, Django)",
        },
        {
          title: "RESTful API & GraphQL",
        },
        {
          title: "Authentication & Authorization (JWT, OAuth, Passport.js)",
        },
        {
          title: "SQL Databases (MySQL, PostgreSQL, SQLite)",
        },
        {
          title: "NoSQL Databases (MongoDB, Firebase, Redis)",
        },
        {
          title: "Database Query Optimization",
        },
        {
          title: "WebSockets (Socket.io, WebRTC)",
        },
        {
          title: "Progressive Web Apps (PWA)",
        },
      ],
    },
    {
      title: "Project",
      items: [
        {
          title: "TeleHealth",
          header: true,
        },
        {
          title:
            "Telehealth refers to the use of digital technology and telecommunications to provide healthcare services remotely. It allows patients to access medical care via the internet, video calls, mobile applications, or IT systems without needing to visit a healthcare facility in person.",
        },
        {
          title: "Ped Vaccine",
          header: true,
        },
        {
          title:
            "A Pediatric Vaccine is a digital or automated system designed to track and schedule vaccinations for children. It helps parents and healthcare providers ensure that children receive their vaccines at the correct ages, following national or global immunization schedules.",
        },
        {
          title: "Pre-Visit Registration",
          header: true,
        },
        {
          title:
            "A Pre-Visit Registration is an advanced digital platform that allows patients to complete the hospital registration process before arriving for their appointment. This system significantly enhances hospital workflow efficiency, reduces wait times, and improves patient experience.",
        },
        {
          title: "Support 3 Languages",
        },
        {
          title: "New patients can be registered",
        },
        {
          title: "Insurance Request",
          header: true,
        },
        {
          title:
            "An Insurance Request is a digital solution designed to streamline the process of verifying, requesting, and approving insurance claims for medical services. This system connects patients, hospitals, and insurance providers, ensuring a faster, more accurate, and transparent claim process.",
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
  const {enableDND} = useSections()
  const [, drop] = useDrop({
    accept: ItemTypes.SECTION,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveSection(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.SECTION,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag : enableDND,

  });

  drag(drop(ref));

  return (
    <div ref={ref} className={`opacity-${isDragging ? "50" : "100"} `}>
      {children}
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
  const {enableDND} = useSections()

  const [, dragRef] = useDrag({
    type: "ITEM",
    item: { sectionIndex, itemIndex },
    collect: (monitor) => ({
      isDragging: !monitor.isDragging(),
    }),
    canDrag : enableDND
  });

  const [, dropRef] = useDrop({
    accept: "ITEM",
    hover: (draggedItem) => {
      // Only allow cross-section movement if it's enabled
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
        draggedItem.sectionIndex = sectionIndex; // Update dragged item section
        draggedItem.itemIndex = itemIndex; // Update dragged item index
      }
    },
  });
  return (
    <div ref={(node) => dragRef(dropRef(node))} className="draggable-item">
      {children}
    </div>
  );
};

const sectionMotionProps = {
  className: "w-full",
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
  viewport: { once: true }, // Ensures animation triggers only once
};

export default function Portfolio() {
  return (
    <SectionProvider data={CV_DATA}>
      <ToolBar/>
      <div className="container w-full  md:w-3/4 flex flex-col md:scale-[.6] origin-[50%_0%] px-3">
        <div className="w-full flex items-start justify-center flex-col  bg-natural-100 gap-3 py-10 rounded-md z-40">
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

        <RenderData />
      </div>
    </SectionProvider>
  );
}

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

      {showDelete && (
        <div
          className="flex items-center justify-center cursor-pointer absolute top-0 right-0 w-6 h-6"
          onClick={(e) => {
            e.stopPropagation(); // Prevent section selection
            removeSection(sectionIndex);
          }}
        >
          <X />
        </div>
      )}
    </div>
  );
};

const SectionHeader = ({ children  ,title, sectionIndex }) => {
  const [ isEditing , setIsEditing  ] = useState(false)

  const {setSelected} = useSections();

  const selectSection = () => {
    setSelected({ sectionIndex , itemIndex: null });
  };

  const editData = (propName) => {
    setIsEditing(true)
    selectSection()
  }
  
  return (
    <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide" onClick={editData}>
      {isEditing ? <EditableItem sectionIndex={sectionIndex} value={title} propName={"title"} className={"w-full"} /> : children}
    </span>
  );
};

const SectionItem = ({
  sectionIndex,
  itemIndex,
  title,
  years,
  header = false,
  isEditing,
}) => {
  const { setSelected , removeItem , focused} = useSections();
  const [showDelete, setShowDelete] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isAbletoEdit, setIsAbletoEdit] = useState(isEditing);
  const selectSectionItem = () => {
    setSelected({ sectionIndex, itemIndex });
  };

  const sectionItemRef = useClickOutside(() => setSelected( prev =>  ({...prev , sectionIndex: null , itemIndex: null }))) 
  const editFocusedItem = (e) => {
      if(e.key === 'Enter' && isFocused){
        console.log('dasdaa')
        setIsAbletoEdit(true)
      }
  }
  

  useEffect(()=>{
    setIsAbletoEdit(isEditing)
  },[isEditing])
  
  return (
    <div
      tabIndex={0}
      className="w-full flex gap-3 "
      ref={sectionItemRef}
      onMouseOver={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
      onFocus={()=>setIsFocused(true)}
      onBlur={()=>setIsFocused(false)}
      onKeyDown={(e) => editFocusedItem(e)}
    >
      <div
        className="w-full flex items-start justify-start text-sm sm:text-base md:text-lg gap-3 "
        onClick={selectSectionItem}
      >
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
            isEdit = { isAbletoEdit  }
          />
        </div>
        <div className="w-fit h-full text-xs sm:text-sm md:text-base">
          <EditableItem
            className={"w-max"}
            sectionIndex={sectionIndex}
            itemIndex={itemIndex}
            value={years}
            propName={"years"}
          />
        </div>
      </div>
      
        <div className={cn(' flex items-center justify-center   cursor-pointer transition-all duration-75' , showDelete ? "opacity-100" : 'opacity-0')}
          onClick={()=> removeItem(sectionIndex, itemIndex)}
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
  isEdit
}) => {
  const [isEditing, setIsEditing] = useState(isEdit);
  const {
    sections,
    addSection,
    addItem,
    handleItemChange,
    saveItem,
    selected,
    setEnableDND ,
    removeItem,
    focused, setFocused
  } = useSections();

  useEffect(()=>{
    setIsEditing(isEdit)
  },[isEdit])

  const inputRef = useClickOutside(() => {
    setIsEditing(false);
    setEnableDND(true)
  });
  
  const editData = (propName) => {
    setIsEditing(true);
    setEnableDND(false)
    
  };
  const saveData = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      setIsEditing(false);
      setTimeout(() => {
        addItem(sectionIndex ,itemIndex);
      }, 1);
      setEnableDND(true)
    }else if (e.key === "Escape" ) {
      setIsEditing(false)
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
    setIsEditing(false)
    setEnableDND(true)
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
  

  return (
    <div className={cn(className,'h-full')} onDoubleClick={() => editData(propName)}>
      {isEditing ? (
        <textarea
          rows={1}
          ref={inputRef}
          defaultValue={value}
          className="w-full  overflow-visible text-start resize-none "
          onChange={(e) => {
            handleItemChange(sectionIndex, itemIndex, propName, e.target.value);
            autoResize(e.target);
          }}
          onKeyDown={(e) => saveData(e)}
          onFocus={(e) => autoResize(e.target)}
         onBlur={(e) =>  handleOnBlur(e) }
        />
      ) : 
        value ? <div className="whitespace-pre-wrap cursor-pointer">{value}</div> 
        :   <div className="w-full h-full hover:border-b  border-white min-w-[80px] cursor-pointer">&nbsp;</div>
      }
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
            <motion.div {...sectionMotionProps} key={index}>
              <Section sectionIndex={index}>
                <SectionHeader sectionIndex={index} title={section.title} >{section.title}</SectionHeader>
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
                        header={item.header}
                        isEditing={item.isEditing}
                      />

                  </DraggableItem>
                ))}
                <button
                  onClick={() => addItem(index)}
                  className="text-blue-500 mt-2 cursor-pointer"
                >
                  Add Item
                </button>
              </Section>
              <Divider />
            </motion.div>
          </DraggableSection>
        ))}
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