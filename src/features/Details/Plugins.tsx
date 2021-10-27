import React from 'react';
import styled from 'styled-components';

const PluginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15em;
  justify-content: center;
  background-color: ${({ theme }) => theme.background.fraction};
  border-radius: 16px;
  color: white;
  align-items: center;
`;

export default function Plugins() {
  return <PluginContainer>Plugins</PluginContainer>;
}
