import React, { useState, useEffect, useMemo } from 'react'
import "./App.css";
import styled from "styled-components";
import { useDropzone } from "react-dropzone";
import { useAbletonAnalyzer } from "./App.hooks";
import {buildDirectoryStructure} from './AbletonExtraction/utility'

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getColor = (props: any) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragActive) {
      return '#2196f3';
  }
  return '#eeeeee';
}

const Dropzone: any = styled.div`
  height: 18em;
  width: 36em;
  background-color: #3b3b3b;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${props => getColor(props)};;
`;

function App() {

  const [files, setFiles] = useState<Array<any>>([[{},'']]);
  const [folderStructure, setFolderStructure] = useState({});
  const results = useAbletonAnalyzer(files, folderStructure);
  
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  }= useDropzone({});


  useEffect(() => {
    if (Object.keys(folderStructure).length === 0) return; 
    let acceptedFilesWithPath = acceptedFiles.map((file: any )=> [file, file.path])
    // console.log(acceptedFilesWithPath)
    setFiles(acceptedFilesWithPath);
  }, [folderStructure]);

  useEffect(() => {
    setFolderStructure(buildDirectoryStructure(acceptedFiles))
  }, [acceptedFiles]);

  useEffect(() => {
    console.log(`results`, results, folderStructure);
  }, [results, folderStructure]);

  const acceptedFileItems = acceptedFiles.map((file: any) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));


  return (
    <Background>
      <Dropzone {...getRootProps({ isDragActive, isDragAccept, isDragReject})} >
        <ul>
          {acceptedFileItems}
        </ul>
        <input {...getInputProps()} />
      </Dropzone>
    </Background>
  );
}

export default App;
