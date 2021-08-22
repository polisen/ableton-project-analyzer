import "./App.css";
import styled from "styled-components";
import Analyzer from "./features/abletonAnalyzer/projectAnalyzer";
import { Container } from "components/common";


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
