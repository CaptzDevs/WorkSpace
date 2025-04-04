import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const SectionContext = createContext();

export const useSections = () => {
  return useContext(SectionContext);
};

export const SectionProvider = ({ data, children }) => {
  const [sections, setSections] = useState(data.sections);
  const [selected, setSelected] = useState({
    sectionIndex: null,
    itemIndex: null,
  });

  const [enableDND, setEnableDND] = useState(true);
  const [focused, setFocused] = useState(false);
  const [allowCrossSectionDrag, setAllowCrossSectionDrag] = useState(true);
  const [block , setBlock] = useState(null);
  const [isDragging , setIsDragging] = useState(false);


  useEffect(()=>{
    const blockData = getBlockData(selected.sectionIndex,selected.itemIndex);
    console.log(blockData,'dasdsada')
    setBlock(blockData);
  },[selected])

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { title: "New Section", items: [] },
    ]);
  };

  const addItem = (sectionIndex , itemIndex , title) => {
    const updatedSections = [...sections];
    console.log(sectionIndex , itemIndex,"<<<");
    if(sectionIndex >= 0 && (itemIndex === null || itemIndex === undefined)){
      console.log('dada111')
    updatedSections[sectionIndex].items.push({
      title: title ?? "",
      years: "",
      header: false,
      isEditing: true,
    });
  }else if (sectionIndex >= 0 && itemIndex >= 0){
    console.log('dada222')

    updatedSections[sectionIndex].items.splice(itemIndex+1, 0, {
      title: title ?? "",
      years: "",
      header: false,
      isEditing: true,
    });
  }

    setSections(updatedSections);
  };


  const handleSectionHeaderChange = (sectionIndex, field, value) => {
    console.log(field, value);
    const updatedSections = [...sections];
    updatedSections[sectionIndex][field] = value;
    console.log(updatedSections);
    setSections(updatedSections);
  };

  const _editBlockStyle = (sectionIndex, itemIndex, value, removeClass = false , removeClasss = []) => {
    const updatedSections = [...sections];
    const isSection = sectionIndex >= 0 && (itemIndex === null || itemIndex === undefined);
  
    const updateClassName = (target) => {
      // Ensure `props` exists
      target['props'] = target['props'] || {};
      // Ensure `className` exists
      target['props']['className'] = target['props']['className'] || '';
  
      let className = target['props']['className'];
  
      if (removeClass) {
        // Remove classes that match any prefix in removeClasss, but don't remove 'hover:' classes
        target['props']['className'] = className
          .split(' ') // Split into array of classes
          .filter(cls => {
            // Check if the class starts with any of the removeClasss prefixes and does not start with 'hover:'
            return !removeClasss.some(rmcls => cls.startsWith(rmcls)) || cls.startsWith('hover:');
          }) // Keep classes that don't match any prefix or are 'hover:'
          .join(' '); // Rejoin into string
      } else {
        // Add class if it doesn't exist
        if (!className.split(' ').includes(value)) {
          target['props']['className'] = className + ' ' + value;
        }
      }
    };
  
    if (isSection) {
      updateClassName(updatedSections[sectionIndex]);
    } else {
      updateClassName(updatedSections[sectionIndex].items[itemIndex]);
    }
  
    console.log(updatedSections);
    setSections(updatedSections);
  };
  

  const editBlockStyle = (sectionIndex, itemIndex, propName, value) => {
    const updatedSections = [...sections];
    const isSection = sectionIndex >= 0 && (itemIndex === null || itemIndex === undefined);
    const target = isSection ? updatedSections[sectionIndex] : updatedSections[sectionIndex].items[itemIndex];

    target.props = target.props || {};

    target.props.style = { ...(target.props.style || {}) };

    target.props.style[propName] = value;

    setSections(updatedSections); 
};

  

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    console.log(sectionIndex, itemIndex , field ,value);
    const updatedSections = [...sections];
    const isSection = sectionIndex >= 0 && (itemIndex === null || itemIndex === undefined);

    if(isSection){
      updatedSections[sectionIndex][field] = value;
    }else{
      updatedSections[sectionIndex].items[itemIndex][field] = value;
    }

    setSections(updatedSections);
  };

  const saveItem = (sectionIndex, itemIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items[itemIndex].isEditing = false;
    setSections(updatedSections);
  };

  // Function to reorder items within a section
  const reorderItem = (
    fromSectionIndex,
    fromItemIndex,
    toSectionIndex,
    toItemIndex
  ) => {
    const updatedSections = [...sections];

    // Remove item from the source section
    const [movedItem] = updatedSections[fromSectionIndex].items.splice(
      fromItemIndex,
      1
    );

    // Add the item to the target section
    updatedSections[toSectionIndex].items.splice(toItemIndex, 0, movedItem);

    setSections(updatedSections);
  };
  // Function to reorder sections
  const reorderSection = (fromIndex, toIndex) => {
    const updatedSections = [...sections];
    const [movedSection] = updatedSections.splice(fromIndex, 1); // Remove the section
    updatedSections.splice(toIndex, 0, movedSection); // Insert the section at the new position
    setSections(updatedSections);
  };

  const removeItem = (sectionIndex, itemIndex) => {
    console.log(sectionIndex, itemIndex);
    if(sectionIndex < 0 || itemIndex < 0) return
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.splice(itemIndex, 1);
    setSections(updatedSections);

    if (itemIndex > 0) {
      updatedSections[sectionIndex].items[itemIndex - 1].isEditing = true;
    }
  };

  const removeSection = (sectionIndex) => {
    const updatedSections = sections.filter((_, index) => index !== sectionIndex);
    setSections(updatedSections);
  };

  const getBlockData = (sectionIndex, itemIndex) =>{
    console.log(sectionIndex, itemIndex);
    const isSection = sectionIndex >= 0 && (itemIndex === null || itemIndex === undefined);
    
    if(isSection){
      return sections[sectionIndex];
    }else{
      return sections[sectionIndex].items[itemIndex];
    }

  }

  useEffect(() => {
    console.log('selected' , selected);
  }, [selected]);

  return (
    <SectionContext.Provider
      value={{
        sections,
        addSection,
        addItem,
        handleItemChange,
        saveItem,
        selected,
        setSelected,
        reorderItem,
        reorderSection,
        allowCrossSectionDrag,
        setAllowCrossSectionDrag,
        removeItem,
        removeSection,
        handleSectionHeaderChange,
        enableDND, setEnableDND,
        focused, setFocused,
        editBlockStyle,
        getBlockData,
        block,setBlock,
        isDragging , setIsDragging,
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
