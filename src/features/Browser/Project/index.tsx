import React from 'react';
import styled from 'styled-components';
import { AbletonFolder } from 'assets/svg';
import { useSelector } from 'react-redux';
import DropZone from 'features/DropZone';
import ProjectFiles from './ProjectFiles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HeaderContainer = styled.div`
  height: 4em;
  width: 100%;
  background-color: ${({ theme }) => theme.background.highlight};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #3b3b3b;
  p {
  }
`;

const FolderIcon = styled(AbletonFolder)`
  height: 60%;
  padding-left: 15px;
`;

const ProjectName = styled.div`
  padding: 10px;
  color: white;
  font-size: 2em;
  margin-left: 10px;
`;

const Group = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
`;
const ProjectHeader = ({ text }: { text: string }) => (
  <HeaderContainer>
    <Group>
      <FolderIcon />
      <ProjectName>{text}</ProjectName>
    </Group>
  </HeaderContainer>
);

export default function BrowserContent() {
  const folderRoot = useSelector(
    ({ fileStructure: { fileStructure } }: any) => Object.keys(fileStructure)[0],
  );
  const results = useSelector(({ fileStructure: { result } }: any) => result);
  return (
    <Container>
      <ProjectHeader text={folderRoot} />
      {Object.keys(results).length === 0 ? <DropZone /> : <ProjectFiles />}
    </Container>
  );
}
