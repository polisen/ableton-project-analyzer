import styled from "styled-components";
import { Ableton, Check, Cross, ChevronDown, ChevronUp } from "svg";
import { useState, useRef } from "react";
import { Chevron, Text, Container } from "components/common";
import { ExpandingDrawer } from "./ExpandingDrawer";

const StyledItemContainer = styled(Container.Flex)`
  justify-content: space-between;
  padding: 10px;
  padding-left: 0px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid #3b3b3b;
  margin-bottom: 2px;
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.08);
  }
`;

const FlexStart = styled(Container.Flex)`
  justify-content: flex-start;
  width: 90%;
`;

const AbletonIcon = styled(Ableton)`
  width: 2em;
`;

const ItemContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.04);
  padding: 5 0 5 0;
  width: 100%;
`;

export const FileItem = ({ value }: any) => {
  const [expanded, setExpanded] = useState(false);
  let { fileName, verified, samples } = value;
  return (
    <ItemContainer>
      <StyledItemContainer onClick={() => setExpanded(!expanded)}>
        <FlexStart>
          <Container.Icon
            margin={".5em"}
            size={"1.5em"}
            children={verified ? <Check /> : <Cross />}
          />
          <Text>{getFileName(fileName)}</Text>
          <Container.Icon
            margin={".5em"}
            size={"1.5em"}
            color={'#b3b3b3'}
            children={<AbletonIcon />}
          />
        </FlexStart>
        <Chevron expanded={expanded} setExpanded={setExpanded} />
      </StyledItemContainer>
      {samples && <ExpandingDrawer expanded={expanded} info={value} />}
    </ItemContainer>
  );
};

const getFileName = (str: string): string => str.substr(0, str.lastIndexOf(".")) || str;
