import React from 'react';
import styled from 'styled-components';
import BrowserContent from './File';

const BrowserContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  background-color: red;
  display: flex;
  flex-direction: column;
  grid-area: "browser";
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 5em;
  background-color: blue;
`;

const AppHeader = () => <HeaderContainer>header</HeaderContainer>;

export default function Browser() {
  return (
    <BrowserContainer>
      <AppHeader />
      <BrowserContent />
    </BrowserContainer>
  );
}
