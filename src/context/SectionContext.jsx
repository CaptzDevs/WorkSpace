import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const SectionContext = createContext();

export const useSections = () => {
  return useContext(SectionContext);
};

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

export const SectionProvider = ({ data, children }) => {
  const [sections, setSections] = useState();
  const [selected, setSelected] = useState({
    sectionIndex: null,
    itemIndex: null,
  });

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [enableDND, setEnableDND] = useState(true);
  const [focused, setFocused] = useState(false);
  const [allowCrossSectionDrag, setAllowCrossSectionDrag] = useState(true);
  const [isDragging , setIsDragging] = useState(false);

  const [textSelectionInfo , setTextSelectionInfo] = useState({});

  const TextStyles = {
    PageHeader: "text-2xl font-bold tracking-tighter md:text-5xl lg:text-5xl pb-2 text-emerald-400",
    SectionHeader: " text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-wide text-teal-400",
    Header : "text-sm sm:text-base md:text-lg text-blue-400",
    Text : "text-sm sm:text-base py-1 text-purple-400 ",
  };


  function getAllChildren() {
    let result = [];
  
    function recurse(items) {
      if (!items) return;
      for (const item of items) {
        if (item.children) {
          result.push(...item.children);
          recurse(item.children);
        }
        if (item.items) {
          recurse(item.items);
        }
      }
    }
  
    recurse(sections);
    return result;
  }
  
    // Rule 
    useEffect(() => {
      const sectionData = JSON.parse(JSON.stringify(data.sections));
      console.log(sectionData,'sectionData')

      sectionData.forEach((section, index) => {
        const props = section.props ?? (section.props = {});
        const style = props.style ?? (props.style = {});
        style.text = index === 0 ? 'PageHeader' : 'SectionHeader';


        section.items.forEach((item, itemIndex) => {
          const props = item.props ?? (item.props = {});
          const style = props.style ?? (props.style = {});
          style.text = item?.items?.length > 0 ? 'Header' : 'Header';

        });
      });
      
   /*    const children = getAllChildren()

      children.forEach((child, index) => {
        const props = child.props ?? (child.props = {});
        const style = props.style ?? (props.style = {});
        style.text = 'Text' ;
      }); */

      
      setSections(sectionData);
    }, [data.sections]);



    const getBlock = (path, data = sections) => {
      let current = data;
 
    
      // No path or invalid path
      if (!Array.isArray(path) || path.length === 0) return null;
    
      // Traverse to the second last path
      for (let i = 0; i < path.length - 1; i++) {
        const { key, index } = path[i];
        if (key === 'section') {
          current = current?.[index];
        } else {
          current = current?.[key]?.[index];
        }
    
        if (!current) return null; // Stop if any step is invalid
      }
    
      const last = path[path.length - 1];
      const block = last.key === 'section'
        ? current?.[last.index]
        : current?.[last.key]?.[last.index];
    
      return { data, block , parent : current };
    };
    
    
  
  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { value: "New Section", items: [] },
    ]);
  };

  const addItem = (path  , title , mode = 1) => {

            const updatedSections = structuredClone(sections);
            let current = updatedSections;

            /* 
                1 Add to Next Item
                2 Add to Last Item
                3 Add to Sub Item

            */

                let parent = null;

                for (let i = 0; i < path.length; i++) {
                  const { key, index } = path[i];
                
                  parent = current; // update parent *before* going deeper
                  current = key === "section" ? current[index] : current[key]?.[index];
                }
     

            console.log('curren11t',parent,current);
            current.items ?? (current.items = []);

            const Block = {
              value: title ?? "",
              isEditing: true,
              props: {
                style: {
                  text:  "Header",
                },
              },
              children: [{
                value: "-",
                type: "text",
              }],
            }

            if(mode === 1){
              parent.items 
              ? parent.items.splice(path[path.length - 1].index+1 , 0, Block) 
              : current.items.splice(current.items.length , 0, Block) 
            }
            if(mode === 2){
              parent.items.push(Block);
            }
            if(mode === 3){
              current.items.push(Block);
            }
          
            setSections(updatedSections);
            
  };

  
  const addIChild = (path , title) => {

    const {data , block} = getBlock(path ,sections);
        console.log(block,'dasdas1141')
          block.children ?? (block.children = []);
          block.children.push({
            value: title ?? "", 
            isEditing: true,
          });
            setSections(data);
      };


  function updateDeep(obj, path, value) {
    const keys = path
      .replace(/\[(\d*)\]/g, (_, index) => index ? `.${index}` : '[]') // [] means push
      .split('.');
  
    let current = obj;
  
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
  
      // Push mode
      if (key === '[]') {
        if (!Array.isArray(current)) throw new Error('Cannot push to non-array');
        current.push(value);
        return;
      }
  
      // Last key
      if (i === keys.length - 1) {
        if (value === '__remove__') {
          if (Array.isArray(current)) {
            current.splice(key, 1);
          } else {
            delete current[key];
          }
        } else {
          current[key] = value;
        }
      } else {
        // Create next container if missing
        const nextKey = keys[i + 1];
        if (!(key in current)) {
          current[key] = /^\d+$/.test(nextKey) ? [] : {};
        }
        current = current[key];
      }
    }
  }
  
  const editBlockProps = (path, propPath, value) => {
    console.log(path, propPath, value)
    const { data, block } = getBlock(path, sections);
    block.props ??= {};
  
    updateDeep(block, propPath, value);
    
    setSections(JSON.parse(JSON.stringify(data)));

  };
  
  const editBlockStyle = (path, propName, value) => {

    const { data , block} = getBlock(path ,sections);

    block.props ?? (block.props = {});
    block.props.style = block.props.style ?? {}
    block.props.style[propName] = value;

    setSections(data); 

};

    const wrapSelectedTextWithTag = (blockData,tag = 'u') => {
      const { selectedText, start, end } = textSelectionInfo;
      if (selectedText) {
        const html = blockData.value;
        const openTag = `<${tag}>`;
        const closeTag = `</${tag}>`;

        const updatedHTML =
          html.slice(0, start) +
          openTag + selectedText + closeTag +
          html.slice(end);

        editBlockProps(selectedBlock, 'value', updatedHTML);
      }else{
        const html = blockData.value;
        const openTag = `<${tag}>`;
        const closeTag = `</${tag}>`;
        console.log(html,'dadsa')

        const updatedHTML = openTag + html + closeTag 
        editBlockProps(selectedBlock, 'value', updatedHTML);
      }
    };



  const nomalizePath = (path) => {
    const normalizedPath = path.map((item) => {
      const { key, index } = item;
      return index;
    });
    return normalizedPath;
  }


  const handleItemChange = (path, field, value) => {
    const updatedSections = structuredClone(sections);
    let current = updatedSections;
  
    for (let i = 0; i < path.length - 1; i++) {
      const { key, index } = path[i];
      current = key === "section" ? current[index] : current[key]?.[index];
    }
  
    const { key, index } = path.at(-1);
    if (key === "section") {
      current[index][field] = value;
    } else {
      current[key][index][field] = value;
    }
    console.log(path, field, value,'gsjaisf');
  
    setSections(updatedSections);
  };

  useEffect(()=>{
    console.log('sections change' , sections)
  },[sections])
  
  // Function to reorder items within a section
  const reorderItem = (
    fromSectionIndex,
    fromItemIndex,
    toSectionIndex,
    toItemIndex
  ) => {
    const updatedSections = [...sections];
  
    const fromList = updatedSections[fromSectionIndex].items;
    const toList = updatedSections[toSectionIndex].items;
  
    const [movedItem] = fromList.splice(fromItemIndex, 1);
    toList.splice(toItemIndex, 0, movedItem);
  
    setSections(updatedSections);
  };


  const moveItem = (sourcePath, targetPath) => {
    const updatedSections = [...sections];
  
    const source = getBlock(sourcePath, updatedSections);
    const target = getBlock(targetPath, updatedSections);
  
    if (!source || !target) return;
  
    // Remove the item from source
    const removedItem = source.parent[source.key].splice(source.index, 1)[0];
  
    // Ensure target array exists
    if (!Array.isArray(target.parent[target.key])) {
      target.parent[target.key] = [];
    }
  
    // Insert into target
    target.parent[target.key].splice(target.index, 0, removedItem);
  
    setSections(updatedSections);
  };
  
  
  // Function to reorder sections
  const reorderSection = (fromIndex, toIndex) => {
    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(fromIndex, 1); // Remove the section
    updatedSections.splice(toIndex, 0, movedSection); // Insert the section at the new position
    setSections(updatedSections);
  };

  

  function removeBlock(path) {
    const updatedSections = structuredClone(sections);
    let current = updatedSections;
  
    for (let i = 0; i < path.length - 1; i++) {
      const { key, index } = path[i];
      current = key === 'section' ? current[index] : current[key][index];
    }
  
    const last = path[path.length - 1];
    const { key, index } = last;
  
    // Remove the item at the final location
    if(key === 'section'){
      updatedSections.splice(index, 1);
    }
    else if (Array.isArray(current[key])) {
      current[key].splice(index, 1);
    }
  
    setSections(updatedSections);
  }

/*   const removeBlock = (sectionIndex) => {
    const updatedSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(updatedSections);
  };
 */

  return (
    <SectionContext.Provider
      value={{
        sections,
        addSection,
        addItem,
        addIChild,
        handleItemChange,
        selected,
        setSelected,
        reorderItem,
        reorderSection,
        allowCrossSectionDrag,
        setAllowCrossSectionDrag,
        moveItem,
        removeBlock,
        enableDND, setEnableDND,
        focused, setFocused,
        editBlockStyle,
        editBlockProps,
        isDragging , setIsDragging,
        selectedBlock, setSelectedBlock,
        getBlock,
        colors,
        backgroundColors,
        textSelectionInfo , setTextSelectionInfo,
        wrapSelectedTextWithTag,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
