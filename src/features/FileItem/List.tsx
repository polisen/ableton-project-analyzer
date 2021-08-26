import styled from 'styled-components';
import { Check, QuestionMark } from 'svg';
import { Text, Container } from 'components/common';
import * as React from 'react';

const StyledContainer = styled(Container.Flex)`
  margin: 2px;
  padding-left: 5px;
  justify-content: flex-start;
  height: auto;
`;

const Header = ({ text }: any) => (
  <div style={{ width: '100%', padding: '5px' }}>
    <Text>{text}</Text>
  </div>
);

const Sample = ({ text, verified }: any) => (
  <StyledContainer>
    <Container.Icon margin=".5em" size="1em" color={verified ? '#02ff00' : '#0300c5'}>
      {verified ? <Check /> : <QuestionMark />}
    </Container.Icon>
    <Text.Dimmed wrap fontSize={12}>
      {text}
    </Text.Dimmed>
  </StyledContainer>
);

const Samples = ({ samples }: any) => (
  <>
    {Object.entries(samples).map(([key, value]: any) => (
      <Sample key={key} text={value.FileName} verified={value.verified} />
    ))}
  </>
);

const Plugin = ({ name, type }: any) => (
  <StyledContainer>
    <Text fontSize={12}>{name}</Text>
    <Text.Dimmed fontSize={12}>{type}</Text.Dimmed>
  </StyledContainer>
);

const Plugins = ({ plugins }: any) => (
  <>
    {Object.entries(plugins).map(([key, v]: any) => (
      <Plugin key={key} name={v.Name} type={v.type} />
    ))}
  </>
);

export default {
  Plugins,
  Plugin,
  Sample,
  Header,
  Samples,
};
