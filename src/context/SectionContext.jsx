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

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { title: "New Section", items: [] },
    ]);
  };

  const addItem = (sectionIndex , itemIndex , title) => {
    const updatedSections = [...sections];
    console.log(sectionIndex , itemIndex);
    if(sectionIndex >= 0 && !itemIndex){
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
    setSections(updatedSections);
  };

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    console.log(sectionIndex, itemIndex);
    const updatedSections = [...sections];
    if(sectionIndex >= 0 && itemIndex >= 0){
      updatedSections[sectionIndex].items[itemIndex][field] = value;
    }else{
      updatedSections[sectionIndex][field] = value;
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
        focused, setFocused
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
