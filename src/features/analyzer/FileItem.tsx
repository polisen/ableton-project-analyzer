import styled from "styled-components";
import { Ableton, Check, Cross, ChevronDown, ChevronUp } from "svg";
import { useState } from "react";


const IconContainer = styled.div`
  width: 1.5em;
  padding: 0 1em 0 1em;
  display: flex;
  justify-content: center;
  align-items: center;
`;


const StyledItemContainer = styled.div`
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  padding-left: 0px;
  background-color: rgba(255, 255, 255, 0.08);
  border-radius: 4px;

  margin: 10px;
  :hover {
      background-color: rgba(255, 255, 255, 0.12)
  }
`;

const StyledItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const StyledText = styled.p`
  font-size: 22px;
  margin: 0;
  padding-left: 10px;
`;

const AbletonIcon = styled(Ableton)`
  width: 2em;
`;


export const FileItem = ({ value }: any) => {
  const [expanded, setExpanded] = useState(false);
  console.log(`value`, value);
  return (
    <StyledItemContainer onClick={() => setExpanded(!expanded)}>
      <StyledItemInfo>
        <IconContainer>
          {value.validation ? <Check /> : <Cross />}
        </IconContainer>
        <AbletonIcon />
        <StyledText>
          {value.fileName.substr(0, value.fileName.lastIndexOf(".")) ||
            value.fileName}
          .als
        </StyledText>
      </StyledItemInfo>

      <Chevron expanded={expanded} setExpanded={setExpanded} />
    </StyledItemContainer>
  );
};

const StyledChevron = styled.div`
  width: 1.5em;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  :hover {
      background-color: rgba(255, 255, 255, 0.2)
  }
`;

export const Chevron = ({ expanded, setExpanded }: any) => {
  return (
    <StyledChevron onClick={() => setExpanded(!expanded)}>
      {expanded ? <ChevronUp /> : <ChevronDown />}
    </StyledChevron>
  );
};
