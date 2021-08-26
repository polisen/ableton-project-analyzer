import { useSpring, animated } from 'react-spring';
import { Divider } from 'components/common';
import * as React from 'react';
import List from './List';

const ExpandingDrawer = ({ expanded, info: { samples, plugins } }: any) => {
  const style: any = useSpring({
    opacity: expanded ? '1' : '0',
    height: expanded ? '400px' : '0px',
    visibility: expanded ? 'visible' : 'hidden',
  });

  return (
    <animated.div style={{ ...style, overflow: 'scroll' }}>
      <List.Header text="Samples:" />
      <List.Samples {...{ samples }} />
      <Divider />
      <List.Header text="Plugins:" />
      <List.Plugins {...{ plugins }} />
    </animated.div>
  );
};

export default ExpandingDrawer;
