import "./App.css";
import styled from "styled-components";
import { useLottie } from "lottie-react";
import React, { useEffect } from 'react'
import BounceData from "./Check.json";
import useHover from 'hooks/useHover'

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
  loop: false,
  autoplay: false,
};

const style = {
  height: 700,
  border: 3,
  borderStyle: "1x solid red",
  borderRadius: 7,
};

const InteractiveLottie = ({isHovered}) => {
  const Lottie = useLottie(options, style);
  let {View, animationItem, setDirection, play, stop} = Lottie;
  useEffect(() => {
      console.log(animationItem)
  }, [animationItem]);
  // Lottie.stop()
  useEffect(() => {
    if (isHovered) {
      setDirection(1)
      play()
    } else {
      setDirection(-1)
      play()
    }
  }, [isHovered]);
  return View;
};

export const Wrapper = () => {
  const [hoverRef, isHovered] = useHover()

  useEffect(() => {
    // console.log(isHovered);
  }, [isHovered]);

  return (
    <Background ref={hoverRef}>
      <InteractiveLottie {...{isHovered}}/>
    </Background>
  );
};

export default Wrapper;
