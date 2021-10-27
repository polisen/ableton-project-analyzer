import React from 'react';
import styled from 'styled-components';

const SamplesContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15em;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.fraction};
  margin-bottom: 6px;
  border-radius: 16px;
  align-items: center;
  color: white;
`;

export default function Samples() {
  return <SamplesContainer>Samples</SamplesContainer>;
}
