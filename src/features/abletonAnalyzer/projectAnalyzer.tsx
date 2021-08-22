import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useAbletonAnalyzer } from "./projectAnalyzer.hooks";
import { buildDirectoryStructure } from "./AbletonExtraction/utility";
import { useDispatch, useSelector } from "react-redux";
import { reduceFiles, setAcceptedFiles } from "./analyzerSlice";
import { FileItem } from "../../components/FileItem";

const getColor = (props: any) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isDragActive) {
    return "#2196f3";
  }
  return "#eeeeee";
};

const Dropzone: any = styled.div`
  height: 95%;
  width: 95%;
  background-color: #121212;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${(props) => getColor(props)}; ;
`;




const Analyzer = () => {
  const endFiles = useSelector(({ fileStructure }: any) => fileStructure.files);
  const dispatch = useDispatch();
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ disabled: Object.keys(endFiles).length > 0 });

  const [files, setFiles] = useState<Array<any>>([[{}, ""]]);
  const [folderStructure, setFolderStructure] = useState({});
  const results = useAbletonAnalyzer(files, folderStructure);

  useEffect(() => {
    if (Object.keys(folderStructure).length === 0) return;
    let acceptedFilesWithPath = acceptedFiles.map((file: any) => [
      file,
      file.path, 
    ]);
    // console.log(acceptedFilesWithPath)
    setFiles(acceptedFilesWithPath);
  }, [folderStructure]);

  useEffect(() => {
    if (acceptedFiles.length === 0) return;
    // dispatch(setAcceptedFiles(acceptedFiles));
    setFolderStructure(buildDirectoryStructure(acceptedFiles));
  }, [acceptedFiles]);

  useEffect(() => {
    dispatch(reduceFiles(results));
  }, [results, folderStructure]);
  console.log(`endFiles`, endFiles);

  return (
    <>
      <Dropzone
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        noClick={acceptedFiles.length > 0}
      >
        <input {...getInputProps()} />
        <div style={{ width: "100%", height: "100%", overflow: "scroll" }}>
          {Object.entries(endFiles).map(([key, value]) => (
            <FileItem key={key} value={value} />
          ))}
        </div>
      </Dropzone>
    </>
  );
};

export default Analyzer;
