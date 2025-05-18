import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useGeneralStore} from '../helper/GeneralStoreContext';

import {XMLParser} from 'fast-xml-parser';
import { useTranslation } from 'react-i18next';


const FileInput: React.FC = () => {
    const {generalStore, setGeneralStoreData} = useGeneralStore();
    const {t, i18n} = useTranslation()
    const [fileName, setFileName] = useState<string>(t('fileinput.noFile'));
    
    useEffect(()=> {
        setFileName(t('fileinput.noFile'));
    },[i18n.language])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type === 'application/xml' || file.name.endsWith('.xml')) {
                setFileName(file.name);
                parseXML(file);
            } else {
                setFileName(t('fileinput.onlyXML'));
                event.target.value = '';
            }
        } else {
            setFileName(t('fileinput.noFile'));
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
                {t("fileinput.upload")}
                <input
                    type="file"
                    id="fileInput"
                    className="d-none"
                    accept=".xml,application/xml"
                    onChange={handleFileChange}
                />
            </label>
            <p className="mt-3 text-muted">{`${t('fileinput.selectedFile')}: ${fileName}`}</p>
        </>
    );
};

export default FileInput;
