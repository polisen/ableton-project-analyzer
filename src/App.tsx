import React, {useMemo} from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import styled from "styled-components";
import { useLottie, useLottieInteractivity } from "lottie-react";
import { useDropzone } from "react-dropzone";

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

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({});

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
