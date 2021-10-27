import './App.css';
import styled from 'styled-components';
import { Container } from 'components/common';
import React from 'react';
import Analyzer from './features/Analyzer';

const Background = styled(Container.Flex)`
  height: 100vh;
  width: 100vw;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Background>
      <Analyzer />
    </Background>
  );
}

export default App;
