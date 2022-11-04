import React from 'react';
import { Text, View } from 'react-native';
import Tooltip from 'rn-tooltip';

import colors from 'styles/colors';
import { Info, IconInfo } from './styles';

const InfoBox = ({ children }) => {
  const containerStyle = {
    height: 60,
    width: 325,
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
  const popoverStyle = {
    width: '100%',
    height: 60,
    justifyContent: 'center',
  };
  const contentStyle = { color: colors.DARK_GRAY, flexShrink: 1 };

  return (
    <Info>
      <Tooltip
        withOverlay={false}
        withPointer={false}
        containerStyle={containerStyle}
        backgroundColor={colors.WHITE}
        popover={
          <View style={popoverStyle}>
            <Text style={contentStyle}>{children}</Text>
          </View>
        }>
        <IconInfo name="info" />
      </Tooltip>
    </Info>
  );
};

export default InfoBox;
