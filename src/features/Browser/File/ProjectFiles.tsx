import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
height: 100%;
width: 100%;
background-color: yellow;
grid-gap: 0;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
/* grid-template-rows: repeat(auto-fit, minmax(240px, 260px)); */
`;

const FileContainer = styled.div`
height: 1fr;
width: 100%;
background-color: purple;

`;

const File = () => (
  <FileContainer>
    file
  </FileContainer>
);

export default function ProjectFiles() {
  return (
    <Container>
      {new Array(6).fill(0).map(() => (
        <File />
      ))}
    </Container>
  );
}
