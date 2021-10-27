import React from 'react';
import styled from 'styled-components';
import Plugins from './Plugins';
import Samples from './Samples';

const DetailsHeaderContainer = styled.div`
  width: 100%;
  height: 3em;
  background-color: maroon;
`;

const DetailsHeader = () => <DetailsHeaderContainer />;

const DetailsContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: magenta;
  grid-area: "details";
  display: flex;
  flex-direction: column;
`;

export default function Details() {
  return (
    <DetailsContainer>
      <DetailsHeader />
      <Samples />
      <Plugins />
    </DetailsContainer>
  );
}
