import styled from 'styled-components';
import * as React from 'react';

const DefaultContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = ({
  children, size, margin, color,
}: ContainerProps) => (
  <DefaultContainer {...{ size, margin, color }}>{children}</DefaultContainer>
);

type ContainerProps = {
  size?: string;
  margin?: string;
  color?: string;
  children: JSX.Element | JSX.Element[];
};

const defaultProps = {
  size: '1em',
  margin: '1em',
  color: 'white',
};

Container.Flex = styled(DefaultContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

Container.Icon = styled(DefaultContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ size }: ContainerProps) => (size ?? '1em')};
  height: ${({ size }: ContainerProps) => (size ?? '1em')};
  margin: ${({ margin }: ContainerProps) => (margin ?? '1em')};
  svg > path {
    fill: ${({ color }: ContainerProps) => color ?? ''}
  }
`;

Container.defaultProps = defaultProps;

export default Container;
