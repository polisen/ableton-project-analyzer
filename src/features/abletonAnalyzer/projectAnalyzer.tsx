import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { useAbletonAnalyzer, buildDirectoryStructure } from 'hooks/useAbletonAnalyzer';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'components/common';
import { reduceFiles } from './analyzerSlice';
import FileItem from '../FileItem';

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
  return '#3b3b3b';
};

const Dropzone: any = styled.div`
  height: 95%;
  width: 95%;
  background-color: #121212;
  border-radius: 8px;
  border: 1px solid;
  border-color: ${(props) => getColor(props)}; ;
`;

const ScrollContainer = styled(Container)`
  overflow: scroll;
`;

const Analyzer = () => {
  const [files, setFiles] = useState<Array<any>>([[{}, '']]);
  const [folderStructure, setFolderStructure] = useState({});
  const results = useAbletonAnalyzer(files, folderStructure);
  const endFiles = useSelector(({ fileStructure }: any) => fileStructure.files);
  const dispatch = useDispatch();
  const {
    acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject,
  } = useDropzone({ disabled: Object.keys(endFiles).length > 0 });

  useEffect(() => {
    if (Object.keys(folderStructure).length !== 0) {
      setFiles(acceptedFiles.map((file: any) => [file, file.path]));
    }
    console.debug('folderStructure', folderStructure);
  }, [folderStructure, acceptedFiles]);

  useEffect(() => {
    console.debug('accFiles ==>', acceptedFiles);

    if (acceptedFiles.length !== 0) setFolderStructure(buildDirectoryStructure(acceptedFiles));
  }, [acceptedFiles]);

  useEffect(() => {
    console.debug({ results });
    dispatch(reduceFiles(results));
    // console.log("folderStructure", folderStructure);
  }, [results, folderStructure, dispatch]);

  return (
    <>
      <Dropzone
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        noClick={acceptedFiles.length > 0}
      >
        <input {...getInputProps()} />
        <ScrollContainer>
          {Object.entries(endFiles).map(([key, value]) => (
            <FileItem key={key} value={value} />
          ))}
        </ScrollContainer>
      </Dropzone>
    </>
  );
};

export default Analyzer;
