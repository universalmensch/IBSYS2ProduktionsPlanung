// FileInput.tsx
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { parseString } from 'xml2js';
import { useGeneralStore } from '../helper/GeneralStoreContext'; // Import the custom hook
import GeneralStoreDTO from '../dtos/GeneralStoreDTO';
import { BestellungDTO } from '../dtos/BestellungDTO';
import { PrognoseDTO } from '../dtos/PrognoseDTO';

import { XMLParser } from 'fast-xml-parser';


const FileInput: React.FC = () => {
  const [fileName, setFileName] = useState<string>('No file selected');
  const { setGeneralStoreData } = useGeneralStore(); // Get the setGeneralStoreData function from context

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
        setFileName(file.name);
        parseXML(file);
        console.log(file)
      } else {
        setFileName('Please select an XML file');
        event.target.value = ''; // Clear the input if invalid file
      }
    } else {
      setFileName('No file selected');
    }
  };

  const parseXML = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file); // Read the file as text
    reader.onload = (e) => {
      const xmlData = e.target?.result as string;
      console.log(xmlData)
      const parser = new XMLParser({ignoreAttributes : false});
      const json = parser.parse(xmlData);

      setGeneralStoreData(json)
    };
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <label htmlFor="fileInput" className="btn btn-primary btn-lg">
          Choose a File
          <input
            type="file"
            id="fileInput"
            className="d-none"
            accept=".xml,application/xml"
            onChange={handleFileChange}
          />
        </label>
        <p className="mt-3 text-muted">{`Selected file: ${fileName}`}</p>
      </div>
    </div>
  );
};

export default FileInput;
