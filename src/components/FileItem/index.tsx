import styled from "styled-components";
import { Ableton, Check, Cross, ChevronDown, ChevronUp } from "svg";
import { useState, useRef } from "react";
import { Chevron, Text, Container } from "components/common";
import { ExpandingDrawer } from "./ExpandingDrawer";

const IconContainer = styled(Container.Flex)`
  width: 1.5em;
  padding: 0 1em 0 1em;
`;

const StyledItemContainer = styled(Container.Flex)`
  justify-content: space-between;
  color: white;
  padding: 10px;
  padding-left: 0px;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  :hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const StyledItemInfo = styled(Container.Flex)`
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
  console.log(`value`, value);
  return (
    <ItemContainer>
      <StyledItemContainer onClick={() => setExpanded(!expanded)}>
        <StyledItemInfo>
          <IconContainer>
            {value.verified ? <Check /> : <Cross />}
          </IconContainer>
          <AbletonIcon />
          <Text>
            {value.fileName.substr(0, value.fileName.lastIndexOf(".")) ||
              value.fileName}
            .als
          </Text>
        </StyledItemInfo>
        <Chevron expanded={expanded} setExpanded={setExpanded} />
      </StyledItemContainer>
      {value.samples && <ExpandingDrawer expanded={expanded} info={value} />}
    </ItemContainer>
  );
};
