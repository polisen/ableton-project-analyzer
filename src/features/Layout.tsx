import * as React from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';

const BigLayout = styled.div`
  width: 1100px;
  height: 700px;
  display: grid;
  grid-template-columns: 5fr 3fr;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  grid-template-areas: "browser details";

`;

const MobileLayout = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "browser" "details";
  div {
    border-radius: 0px;
  }
`;

const Layout = ({ children }: any) => {
  const isBig = useMediaQuery({
    query: '(min-device-width: 720px)',
  });
  return (
    <>
      {isBig ? (
        <BigLayout {...{}}>{children}</BigLayout>
      ) : (
        <MobileLayout {...{}}>{children}</MobileLayout>
      )}
    </>
  );
};

export default Layout;
