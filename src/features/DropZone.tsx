import * as React from 'react';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { buildStructure, useAbletonAnalyzer } from 'hooks/useAbletonAnalyzer';
import { useAppDispatch } from 'app/hooks';
import { Button, Text, Spinner } from 'components/common';
import { setFileStructure } from 'slices/analyzerSlice';
import unZip from 'workers/unZip';
import { useFirebase } from 'react-redux-firebase';
import { useDispatch } from 'react-redux';

const Dropzone = styled.div<{ noClick: boolean }>`
  height: 100%;
  width: 100%;

  border: 1px solid;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const DemoContainer = styled.div`
  padding-right: 1em;
`;

const DemoButton = ({ setFiles, setLoading }: any) => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const handleDownload = async function downloadFiles() {
    firebase
      .storage()
      .ref('test_project.zip')
      .getDownloadURL()
      .then((url: string) => {
        // console.debug({ url });
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = async () => {
          const results = await unZip(URL.createObjectURL(xhr.response));
          setFiles(results);
          dispatch(setFileStructure(buildStructure(results.map(([, p]) => p))));
          setLoading({ status: false, message: 'Finished' });
        };
        xhr.onloadstart = () => {
          setLoading({ status: true, message: 'Downloading' });
        };
        xhr.onloadend = () => {
          setLoading({ status: true, message: 'Unpacking' });
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <DemoContainer>
      <Button
        onClick={(e: any) => {
          e.stopPropagation();
          handleDownload();
        }}
      >
        Demo Project
      </Button>
    </DemoContainer>
  );
};

const DropZone = () => {
  const dispatch = useAppDispatch();
  const [files, setFiles] = useState<Array<[File, string]>>([]);
  const [loading, setLoading] = useState({ status: false, message: '' });
  useAbletonAnalyzer(files);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    dispatch(
      setFileStructure(buildStructure(acceptedFiles.map((f: any) => f.path))),
    );
    setFiles(acceptedFiles.map((file: any) => [file, file.path]));
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop });

  return (
    <>
      <Dropzone
        {...getRootProps({
          isDragActive,
          isDragAccept,
          isDragReject,
        })}
        // eslint-disable-next-line react/jsx-boolean-value
        noClick={true}
      >
        <input {...getInputProps()} />
        {loading.status ? (
          <>
            <Spinner />
            <Text>{loading.message}</Text>
          </>
        ) : (
          <>
            <Text>Drag n Drop Ableton Project Folder</Text>
            <Text> - or click -</Text>
            <DemoButton setFiles={setFiles} setLoading={setLoading} />
          </>
        )}
      </Dropzone>
    </>
  );
};

export default DropZone;
