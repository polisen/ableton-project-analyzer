import * as React from 'react';
import styled from 'styled-components';

const ButtonDiv = styled.button`
    padding: .5em;
    border: none;
    border-radius: 4px;
    color: white;
    background-color: ${({ theme }) => theme.background.fraction};
    
    :hover {
    background-color: ${({ theme }) => theme.background.ffraction};
    }
`;

interface ButtonProps {
  onClick: any;
  children: JSX.Element | JSX.Element[] | string;
}

export default function Button({ onClick, children }: ButtonProps) {
  return <ButtonDiv onClick={onClick}>{children}</ButtonDiv>;
}
