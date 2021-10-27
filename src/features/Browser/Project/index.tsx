import React from 'react';
import styled from 'styled-components';
import { AbletonFolder } from 'assets/svg';
import { Button } from 'components/common';
import ProjectFiles from './ProjectFiles';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderContainer = styled.div`
  height: 5em;
  width: 100%;
  background-color: ${({ theme }) => theme.background.fraction};
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
  background-color: ${({ theme }) => theme.background.ffraction};

  }
`;

const FolderIcon = styled(AbletonFolder)`
  height: 60%;
  padding-left: 10px;
`;

const ProjectName = styled.div`
  padding: 10px;
  color: white;
  font-size: 36px;
`;

const Chevron = styled(Button)`
  height: 100%;
  margin-right: 10px;
`;

const Group = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ButtonContainer = styled(Group)`
  width: 5em;
`;
const ProjectHeader = ({ text }: { text: string }) => (
  <HeaderContainer>
    <Group>
      <FolderIcon />
      <ProjectName>{text}</ProjectName>
    </Group>
    <ButtonContainer>
      <Chevron onClick={() => {}}>arrow</Chevron>
    </ButtonContainer>
  </HeaderContainer>
);

export default function BrowserContent() {
  return (
    <Container>
      <ProjectHeader text="Project Name" />
      <ProjectFiles />
    </Container>
  );
}
