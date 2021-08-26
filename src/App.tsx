import './App.css';
import styled from 'styled-components';
import { Container } from 'components/common';
import React from 'react';
import Analyzer from './features/abletonAnalyzer/projectAnalyzer';

const Background = styled(Container.Flex)`
  height: 100vh;
  background-color: black;
`;

function App() {
  return (
    <Background>
      <Analyzer />
    </Background>
  );
}

export default App;
