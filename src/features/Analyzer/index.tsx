import * as React from 'react';
import { useFirebase } from 'react-redux-firebase';
import Browser from 'features/Browser/';
import Details from 'features/Details';
import Layout from 'features/Layout';
import JSZip from 'jszip';
import { useDispatch } from 'react-redux';

import { getZippedFileStructure } from 'hooks/useAbletonAnalyzer';
import { setFileStructure, setFiles } from 'slices/analyzerSlice';

const Analyzer = () => {
  const firebase = useFirebase();
  const dispatch = useDispatch();

  const handleDownload = async function downloadFiles() {
    firebase
      .storage()
      .ref('test_project.zip')
      .getDownloadURL()
      .then((url) => {
        console.debug({ url });
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = () => {
          const blob = xhr.response;
          const newZip = new JSZip();
          newZip.loadAsync(blob).then(async (zipped: any) => {
            dispatch(setFileStructure(getZippedFileStructure(zipped)));

            const promises = Object.entries(zipped.files).map(async ([, v]: any) => v.async('blob'));

            const blobs = await Promise.all(promises);
            dispatch(
              setFiles(
                blobs.map((b, i) => [b, Object.keys(zipped.files)[i]]).filter((f: any) => !f[1].includes('__MACOSX')).map(([b, p]) => [URL.createObjectURL(b), p]),
              ),
            );
          });
        };
        xhr.open('GET', url);
        xhr.send();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <Layout>
      <Browser />
      <Details />
      <button type="button" onClick={() => handleDownload()}>
        download
      </button>
    </Layout>
  );
};

export default Analyzer;
