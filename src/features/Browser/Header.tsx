import * as React from 'react';
import styled from 'styled-components';
import { Ableton } from 'assets/svg';
import { Button } from 'components/common';

const HeaderContainer = styled.div`
  width: 100%;
  height: 5em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.background.main};
`;

const AbletonIcon = styled(Ableton)`
padding-left: 1em;
`;

const DemoButton = styled.div`
padding-right: 1em;

`;
const AppHeader = () => (
  <HeaderContainer>
    <AbletonIcon />
    <DemoButton>
      <Button onClick={() => {}}>Demo Project</Button>
    </DemoButton>
  </HeaderContainer>
);

export default AppHeader;
