import styled from "styled-components";

export default styled.hr`
  border: none;
  border-top: 2px solid;
  border-color: ${({ color }) => (color ? color : "#444444")};
  width: 100%;
  margin: ${({ thin }: any) => (thin ? ".1em 0 .1em 0" : ".2em 0 .2em 0")};
`;
