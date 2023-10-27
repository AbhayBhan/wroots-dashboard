import { useState } from "react";

const FileInput = ({ onChange, accept, label }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (onChange) {
      onChange(file);
    }
  };
  return (
    <div>
      <div>
        {label || "Choose a file"}
        <input type="file" accept={accept} onChange={handleFileChange} />
      </div>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
    </div>
  );
};

export default FileInput;
