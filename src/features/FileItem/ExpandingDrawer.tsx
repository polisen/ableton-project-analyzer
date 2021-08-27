import { useSpring, animated } from 'react-spring';
import { Divider } from 'components/common';
import * as React from 'react';
import { ProjectFileResult } from '../../types/analyzer';
import List from './List';

interface DrawerProps {
  expanded: boolean;
  info: ProjectFileResult;
}

const ExpandingDrawer = ({ expanded, info: { samples, plugins } }: DrawerProps) => {
  const style = useSpring({
    opacity: expanded ? '1' : '0',
    height: expanded ? '400px' : '0px',
    visibility: expanded ? 'visible' : 'hidden',
    overflow: 'scroll',
  });

  const animatedDivProps = {
    style,
  };

  return (
    <animated.div {...{ animatedDivProps }}>
      <List.Header text="Samples:" />
      <List.Samples {...{ samples }} />
      <Divider />
      <List.Header text="Plugins:" />
      <List.Plugins {...{ plugins }} />
    </animated.div>
  );
};

export default ExpandingDrawer;
