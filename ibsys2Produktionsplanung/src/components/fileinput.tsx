import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useGeneralStore} from '../helper/GeneralStoreContext';

import {XMLParser} from 'fast-xml-parser';


const FileInput: React.FC = () => {
    const [fileName, setFileName] = useState<string>('No file selected');
    const {generalStore, setGeneralStoreData} = useGeneralStore();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
                setFileName(file.name);
                parseXML(file);
                console.log(file)
            } else {
                setFileName('Please select an XML file');
                event.target.value = '';
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
            const parser = new XMLParser({ignoreAttributes: false, attributeNamePrefix: "",});
            const json = parser.parse(xmlData);

            setGeneralStoreData({...generalStore, input: json})
        };
    };

    return (
        <>
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
        </>
    );
};

export default FileInput;
