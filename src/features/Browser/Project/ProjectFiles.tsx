import React from 'react';
import styled from 'styled-components';
import { AbletonFile } from 'assets/svg';

const Container = styled.div`
height: 100%;
width: 100%;
grid-gap: 0;
display: grid;
background-color: ${({ theme }) => theme.background.fraction};
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
grid-template-rows: repeat(auto-fit, minmax(200px, 1fr));
overflow: scroll;
`;

const FileContainer = styled.div`
width: 100%;
/* background-color: ${({ theme }) => theme.background.fraction}; */
display: flex;
justify-content: center;
align-items: center;
transition: all 0.1s;

:hover {
  background-color: ${({ theme }) => theme.background.ffraction};
  border-radius: 16px;
  }

`;

const AbletonFileIcon = styled(AbletonFile)`
height: 124px;
`;

const File = () => (
  <FileContainer>
    <AbletonFileIcon />
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
