import React from 'react';
import styled from 'styled-components';
import ProjectFiles from './ProjectFiles';

const Container = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;

const ProjectName = styled.div`
height: 5em;
width: 100%;
background-color: green;
`;

export default function BrowserContent() {
  return (
    <Container>
      <ProjectName />
      <ProjectFiles />
    </Container>
  );
}
