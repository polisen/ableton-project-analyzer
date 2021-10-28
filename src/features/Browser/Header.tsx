import * as React from 'react';
import styled from 'styled-components';
import { Ableton } from 'assets/svg';
import { Text } from 'components/common';

const HeaderContainer = styled.div`
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: ${({ theme }) => theme.background.main};
  p {
    font-size: 24px;
    margin-left: 8px;
  }
`;

const AbletonIcon = styled(Ableton)`
  padding-left: 1em;
`;

const AppHeader = () => (
  <HeaderContainer>
    <AbletonIcon />
    <Text>Ableton Project Analyzer v.1.0.2</Text>
  </HeaderContainer>
);

export default AppHeader;
