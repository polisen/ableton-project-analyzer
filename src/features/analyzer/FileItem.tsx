import styled from "styled-components";
import { Ableton, Check, Cross, ChevronDown, ChevronUp } from "svg";
import { useState, useRef } from "react";
import { useSpring, animated } from "react-spring";
import Text from 'components/Text'

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
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.04);
  cursor: pointer;
  /* margin: 10px; */
  :hover {
    background-color: rgba(255, 255, 255, 0.12);
  }
`;

const StyledItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AbletonIcon = styled(Ableton)`
  width: 2em;
`;

const ItemContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.04);
  padding: 5 0 5 0;
  /* max-height: 10em; */
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
            { value.fileName.substr(0, value.fileName.lastIndexOf(".")) ||
              value.fileName}
            .als
          </Text>
        </StyledItemInfo>
        <StyledChevron>
          <Chevron expanded={expanded} setExpanded={setExpanded} />
        </StyledChevron>
      </StyledItemContainer>
      {value.samples && <ExpandingDrawer expanded={expanded} info={value} />}
    </ItemContainer>
  );
};

const StyledAnimatedDiv = styled(animated.div)`
  z-index: -1;
  overflow: scroll;
`;

const Divider = styled.hr`
  border: none;
  border-top: 2px solid;
  border-color: ${({ color }) => (color ? color : "#444444")};
  width: calc(100%);
  margin: ${({ sm }: any) => (sm ? ".1em 0 .1em 0" : ".2em 0 .2em 0")};
`;


const ExpandingDrawer = ({ expanded, info: { samples, plugins }}: any) => {
  const style: any= useSpring({
    opacity: expanded ? "1" : "0",
    height: expanded ? "400px" : "0px",
    visibility: expanded ? "visible" : "hidden",
  });

  return (
    <StyledAnimatedDiv style={{...style}}>
      <CategoryHeader text={'Samples:'}/>
      {Object.entries(samples).map(([key, value]) => {
        let {FileName, verified}: any = value;
        return (
        <>

            <SampleItem text={FileName} verified={verified}/>
        </>
)
      })}
      <Divider/>
      <CategoryHeader text={'Plugins:'}/>
      {Object.entries(plugins).map(([key, value]) => {
        let {Name, type}: any = value;
        return <PluginItem name={Name} type={type}/>
      })}
    </StyledAnimatedDiv>
  );
};

const CategoryHeader = ({ text }: any) => {
  return (
    <div style={{ width: "100%", padding: "5px" }}>
      <Text>{text}</Text>
    </div>
  );
};

const SampleItem = ({text, verified}: any) => {
  return (
    <div style={{ width: "100%", margin: "2px", paddingLeft: "5px", overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      {verified ? <Check /> : <Cross />}
      <Text.Dimmed>{text}</Text.Dimmed>
    </div>
  );
};

const PluginItem = ({name, type}: any) => {
  return (
    <div style={{ width: "100%", padding: "2px", display: 'flex', paddingLeft: "5px" }}>
      <Text fontSize={36}>{name}</Text>
      <Text.Dimmed>- {type}</Text.Dimmed>
    </div>
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
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export const Chevron = ({ expanded, setExpanded }: any) => {
  return (
    <StyledChevron onClick={() => setExpanded(!expanded)}>
      {expanded ? <ChevronUp /> : <ChevronDown />}
    </StyledChevron>
  );
};
