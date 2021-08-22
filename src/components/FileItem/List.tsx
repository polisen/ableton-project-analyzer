import styled from "styled-components";
import { Check, QuestionMark } from "svg";
import { Text, Divider, Container } from "components/common";

const StyledContainer = styled(Container.Flex)`
  margin: 2px;
  padding-left: 5px;
  justify-content: flex-start;
  height: auto;
`;

const Header = ({ text }: any) => {
  return (
    <div style={{ width: "100%", padding: "5px" }}>
      <Text>{text}</Text>
    </div>
  );
};

const Sample = ({ text, verified }: any) => {
  return (
    <StyledContainer>
      <Container.Icon
        margin={".5em"}
        size={"1em"}
        color={verified ? "#02ff00" : "#0300c5"}
        children={verified ? <Check /> : <QuestionMark />}
      />
      <Text.Dimmed wrap fontSize={12}>
        {text}
      </Text.Dimmed>
    </StyledContainer>
  );
};

const Samples = ({ samples }: any) => {
  return (
    <>
      {Object.entries(samples).map(([key, value]: any) => (
        <Sample text={value.FileName} verified={value.verified} />
      ))}
    </>
  );
};

const Plugin = ({ name, type }: any) => {
  return (
    <StyledContainer>
      <Text fontSize={12}>{name}</Text>
      <Text.Dimmed fontSize={12}>{type}</Text.Dimmed>
    </StyledContainer>
  );
};

const Plugins = ({ plugins }: any) => {
  return (
    <>
      {Object.entries(plugins).map(([k, v]: any) => (
        <Plugin name={v.Name} type={v.type} />
      ))}
    </>
  );
};

export default {
  Plugins,
  Plugin,
  Sample,
  Header,
  Samples,
};
