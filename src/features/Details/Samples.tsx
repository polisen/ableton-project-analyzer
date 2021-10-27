import React from 'react';
import styled from 'styled-components';

const SamplesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15em;
  justify-content: center;
  background-color: aliceblue;
  align-items: center;
`;

export default function Samples() {
  return <SamplesContainer>Samples</SamplesContainer>;
}
