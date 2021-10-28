import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { Text } from 'components/common';
import { setSelected } from 'slices/analyzerSlice';
import abletonFile from 'assets/images/abletonFile.png';

const Container = styled.div`
  height: 100%;
  width: 100%;
  grid-gap: 1em;
  padding: 1em;
  padding-left: 2.5em;
  display: grid;
  background-color: ${({ theme }) => theme.background.fraction};
  grid-template-columns: repeat(auto-fit, minmax(80px, 120px));
  grid-template-rows: repeat(auto-fit, minmax(80px, 120px));
  overflow: scroll;
`;

const FileContainer = styled.div<{ selected: boolean }>`
  width: 100%;
  background-color: ${({ theme, selected }) => (selected ? theme.background.ffraction : 'none')};
  border-radius: 8px;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: all 0.1s;
  cursor: pointer;
  img {
    height: 60%;
    width: 50%;
  }
  p {
    height: 30%;
  }
  :hover {
    background-color: ${({ theme }) => theme.background.ffraction};
    border-radius: 8px;
  }
`;

const File = ({
  text, onClick, id, selected,
}: any) => (
  <FileContainer onClick={() => onClick(id)} selected={selected}>
    <img alt="file icon" src={abletonFile} />
    <Text>{text}</Text>
  </FileContainer>
);

export default function ProjectFiles() {
  const files = useSelector(({ fileStructure }: any) => fileStructure.result);
  const selected = useSelector(
    ({ fileStructure }: any) => fileStructure.selected,
  );
  const dispatch = useDispatch();
  const handleClick = (key: string) => dispatch(setSelected(key));
  return (
    <Container>
      {files
        && Object.entries(files).map(([key, value]: any) => (
          <File
            key={key}
            id={key}
            selected={key === selected}
            onClick={handleClick}
            text={value.fileName ?? ''}
          />
        ))}
    </Container>
  );
}
