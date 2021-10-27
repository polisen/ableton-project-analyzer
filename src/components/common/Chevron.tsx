import styled from 'styled-components';
import { ChevronDown, ChevronUp } from 'assets/svg';
import * as React from 'react';

const StyledChevron = styled.div`
  width: 1.5em;
  height: 100%;
  color: white;
  padding-right: 1em;
  border-radius: 100%;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default ({ expanded, setExpanded }: { expanded: boolean; setExpanded: Function }) => (
  <StyledChevron onClick={() => setExpanded(!expanded)}>
    {expanded ? <ChevronUp /> : <ChevronDown />}
  </StyledChevron>
);
