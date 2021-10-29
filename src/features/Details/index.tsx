import * as React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { AbletonFolder } from 'assets/svg';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import Plugins from './Plugins';
import Samples from './Samples';

const DetailsContainer = styled.div<{ isBig: boolean }>`
  width: 100%;
  height: 100%;
  ${({ isBig }) => (isBig ? 'height: 700px' : 'max-height: 400px')}
  background-color: ${({ theme }) => theme.background.fraction};
  grid-area: "details";
  display: flex;
  flex-direction: column;
  overflow: scroll;
  border-radius: 16px;
  div {
    /* border-radius: 8px; */
  }
`;

const HeaderContainer = styled.div`
  height: 4em;
  width: 100%;
  background-color: ${({ theme }) => theme.background.main};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  div {
  }
`;

const FolderIcon = styled(AbletonFolder)`
  height: 50%;
  padding-left: 10px;
`;

const ProjectName = styled.div`
  padding: 10px;
  color: white;
  font-size: 1rem;
`;

const Group = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const DetailsHeader = ({ text }: { text: string }) => (
  <HeaderContainer>
    <Group>
      <FolderIcon />
      <ProjectName>{text}</ProjectName>
    </Group>
  </HeaderContainer>
);

export default function Details() {
  const selected = useSelector(
    ({ fileStructure }: any) => fileStructure.selected,
  );
  const results = useSelector(({ fileStructure }: any) => fileStructure.result);
  const [
    {
      samples, verifiedSamples, plugins, fileName,
    },
    setProject,
  ]: [any, any] = useState({});
  const isBig = useMediaQuery({
    query: '(min-device-width: 720px)',
  });
  useEffect(() => {
    setProject(selected.length > 0 && results[selected] && results[selected]);
  }, [results, selected]);

  return (
    <DetailsContainer isBig={isBig}>
      <DetailsHeader text={fileName} />
      <Samples {...{ samples, verifiedSamples }} />
      <Plugins {...{ plugins }} />
    </DetailsContainer>
  );
}
