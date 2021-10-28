import React from 'react';
import styled from 'styled-components';
import BrowserContent from './Project';
import AppHeader from './Header';

const BrowserContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.background.fraction};
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  grid-area: "browser";
  overflow: hidden;
`;

export default function Browser() {
  return (
    <BrowserContainer>
      <AppHeader />
      <BrowserContent />
    </BrowserContainer>
  );
}
