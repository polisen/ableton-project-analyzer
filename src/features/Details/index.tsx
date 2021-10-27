import React from 'react';
import styled from 'styled-components';
import { AbletonFolder } from 'assets/svg';
// import { Button } from 'components/common';
import Plugins from './Plugins';
import Samples from './Samples';

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.fraction};
  grid-area: "details";
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  
`;

const HeaderContainer = styled.div`
  height: 4em;
  width: 100%;
  background-color: ${({ theme }) => theme.background.fraction};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  margin-bottom: 5px;
`;

const FolderIcon = styled(AbletonFolder)`
  height: 60%;
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
  return (
    <DetailsContainer>
      <DetailsHeader text="Project Name" />
      <Samples />
      <Plugins />
    </DetailsContainer>
  );
}
