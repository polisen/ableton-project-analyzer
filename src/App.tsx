import "./App.css";
import styled from "styled-components";
import Analyzer from "./features/analyzer/projectAnalyzer";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;



function App() {


  return (
    <Background>
      <Analyzer/>
    </Background>
  );
}

export default App;
