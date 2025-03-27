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

  const [allowCrossSectionDrag, setAllowCrossSectionDrag] = useState(true);

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { header: "New Section", items: [] },
    ]);
  };

  const addItem = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items.push({
      title: "",
      years: "",
      header: false,
      isEditing: true,
    });
    setSections(updatedSections);
  };

  const handleItemChange = (sectionIndex, itemIndex, field, value) => {
    console.log(field, value);
    const updatedSections = [...sections];
    updatedSections[sectionIndex].items[itemIndex][field] = value;
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

  useEffect(() => {
    console.log(selected);
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
      }}
    >
      {children}
    </SectionContext.Provider>
  );
};
