import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';

const styledTouchableOpacity = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  backgroundColor: colors.WHITE,
  borderRadius: 8,
  marginTop: 13,
  marginBottom: 3,
  padding: 16,
  shadowColor: colors.BLACK,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.62,
  elevation: 2,
  borderBottomLeftRadius: 0,
  minHeight: 100,
};

const ContainerItem = ({ onPress, children }) => {
  return (
    <TouchableOpacity style={styledTouchableOpacity} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default ContainerItem;
