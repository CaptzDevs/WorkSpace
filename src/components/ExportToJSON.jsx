import React from 'react';
import { Button } from './ui/button';
import { Share } from 'lucide-react';

const ExportToJSON = ({ data }) => {
  const exportJsonData = () => {
    // Convert the sections data to a JSON string
    const jsonData = JSON.stringify({sections : data}, null, 2); // Pretty-print with indentation

    // Create a Blob from the JSON string
    const blob = new Blob([jsonData], { type: 'application/json' });

    // Create a temporary anchor element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sections_data.json'; // Name of the file to download
    link.click(); // Trigger the download
  };

  return (
    <Button
      onClick={exportJsonData}
      className="text-blue-500  cursor-pointer text-xs"
    >
      <Share  /> JSON
    </Button>
  );
};

export default ExportToJSON;
