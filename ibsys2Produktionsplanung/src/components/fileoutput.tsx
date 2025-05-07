import { XMLBuilder } from "fast-xml-parser";
import { XMLOutput } from '../dtos/XMLOutput';
import { Button } from "react-bootstrap";

const DownloadXmlButton = ( jsonData: XMLOutput | undefined) => {
  const handleDownload = () => {
    const builder = new XMLBuilder({
      format: true, 
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });
    console.log(jsonData)
    const xmlContent = builder.build(jsonData);
    console.log(xmlContent)

    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "input.xml";
    link.click();

    URL.revokeObjectURL(url);
  };

  return jsonData && Object.keys(jsonData).length > 0 && <Button onClick={handleDownload}>XML Download</Button>;
};

export default DownloadXmlButton;
