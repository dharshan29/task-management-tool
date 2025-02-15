import { Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileUploaderProps {
  files: any;
  setFiles: (files: any) => void; 
}

const FileUploader: React.FC<FileUploaderProps> = ({ files, setFiles }) => {
  const [fileNames, setFileNames] = useState<any>([]); 

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const convertToBase64 = (file: File) => {
      return new Promise<any>((resolve, reject) => { 
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as any); 
        reader.onerror = (error) => reject(error);
      });
    };

    Promise.all(acceptedFiles.map((file) => convertToBase64(file)))
      .then((base64Files: any) => { 
        setFiles((prevFiles: any) => [...(prevFiles || []), ...base64Files]); 
        setFileNames((prevNames: any) => [...prevNames, ...acceptedFiles.map((file) => file.name)]); 
      })
      .catch((error) => console.error("Error converting files:", error));
  }, [setFiles]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      style={{
        border: "1px solid #00000021",
        background: "#F1F1F15C",
        padding: "10px",
        textAlign: "center",
        height: "43px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        fontSize: "14px",
        borderRadius: "8px",
      }}
    >
      <input {...getInputProps()} />
      <Typography variant="caption" sx={{ fontWeight: 500 }}>
        {fileNames.length > 0 ? fileNames.join(", ") : "Drop your files here or Update"}
      </Typography>
    </div>
  );
};

export default FileUploader;
