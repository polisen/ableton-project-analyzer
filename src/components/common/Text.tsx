import styled from 'styled-components';
import * as React from 'react';

type TextProps = {
  children?: React.ReactNode;
  wrap?: boolean;
  inset?: boolean;
  fontSize?: number;
};

const DefaultText = styled.p<TextProps>`
  font-family: 'Roboto Mono';
  font-weight: bold;
  color: white;
  margin: 5px;
  word-wrap: ${({ wrap }) => (wrap ? 'break-word' : 'normal')};
  word-break: ${({ wrap }) => (wrap ? 'break-all' : 'normal')};
  padding-left: 5px;
  margin-left: ${({ inset }) => (inset ? '.5em' : '0')};
  font-size: ${({ fontSize }) => `${fontSize}px`};
`;

const Text = ({
  children, inset, wrap, fontSize,
}: TextProps) => (
  <DefaultText {...{ inset, wrap, fontSize }}>{children}</DefaultText>
);

Text.defaultProps = {
  children: null,
  wrap: false,
  inset: false,
  fontSize: 12,
};

Text.Dimmed = styled(DefaultText)`
  color: #b3b3b3;
`;

Text.Playlist = styled(DefaultText)`
  font-size: 76px;
`;
export default Text;
