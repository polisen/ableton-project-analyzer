
import "./App.css";
import styled from "styled-components";
import { useLottie, useLottieInteractivity } from "lottie-react";


import BounceData from "./bounce-lottie.json";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;



const options = {
  animationData: BounceData,
};



const style = {
  height: 700,
  border: 3,
  borderStyle: "1x solid red",
  borderRadius: 7,
};


export const InteractiveLottie = () => {
  const lottieObj = useLottie(options, style);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "cursor",
    actions: [
      {
        position: { x: [0, 1], y: [0, 1] },
        type: "loop",
        frames: [0, 60],
      },
      {
        position: { x: -1, y: -1 },
        type: "stop",
        frames: [60],
      },
    ],
  });
  return Animation;
}

function Animation() {
  return (
    <Background>
      <InteractiveLottie/>
    </Background>
  );
}

export default Animation;
