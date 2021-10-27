import React from 'react';
import styled from 'styled-components';

const PluginContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15em;
  justify-content: center;
  background-color: aliceblue;
  align-items: center;
`;

export default function Plugins() {
  return <PluginContainer>Plugins</PluginContainer>;
}
