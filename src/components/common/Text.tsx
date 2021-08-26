import styled from 'styled-components';
import * as React from 'react';

type TextProps = {
  wrap?: boolean;
  inset?: boolean;
  fontSize?: number;
};

const DefaultText = styled.p`
  font-family: montserrat;
  font-weight: bold;
  color: white;
  margin: 5px;
  word-wrap: ${({ wrap }: TextProps) => (wrap ? 'break-word' : 'normal')};
  word-break: ${({ wrap }: TextProps) => (wrap ? 'break-all' : 'normal')};
  padding-left: 5px;
  margin-left: ${({ inset }: TextProps) => (inset ? '.5em' : '0')};
  font-size: ${({ fontSize }: TextProps) => `${fontSize}px`};
`;

const Text: any = ({
  children,
  props,
}: {
  children: any;
  props: TextProps;
}) => <DefaultText {...props}>{children}</DefaultText>;

Text.Dimmed = styled(DefaultText)`
  color: #b3b3b3;
`;

Text.Playlist = styled(DefaultText)`
  font-size: 76px;
`;
export default Text;
