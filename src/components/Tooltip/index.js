import React from 'react';
import { Dimensions } from 'react-native';
import RNTooltip from 'rn-tooltip';

import colors from 'styles/colors';
import { Info, Popover, Message } from './styles';

const { width } = Dimensions.get('window');

const Tooltip = ({ children, message }) => {
  const containerStyle = {
    height: 120,
    width: width - width * 0.15,
    left: 40,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  };

  return (
    <Info>
      <RNTooltip
        withOverlay={false}
        withPointer={false}
        containerStyle={containerStyle}
        backgroundColor={colors.WHITE}
        popover={
          <Popover>
            <Message>{message}</Message>
          </Popover>
        }>
        {children}
      </RNTooltip>
    </Info>
  );
};

export default Tooltip;
