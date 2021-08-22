import styled from "styled-components";

const DefaultContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Container = (props: ContainerProps) => (
  <DefaultContainer {...props}>{props.children}</DefaultContainer>
);

type ContainerProps = {
  size?: string;
  margin?: string;
  color?: string;
  children: JSX.Element|JSX.Element[];
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
  width: ${({ size }: ContainerProps) => (size ?? "1em")};
  height: ${({ size }: ContainerProps) => (size ?? "1em")};
  margin: ${({ margin }: ContainerProps) => (margin ?? "1em")};
  svg > path {
    fill: ${({color}: ContainerProps) => color ?? ''}
  }
`;

export default Container;
