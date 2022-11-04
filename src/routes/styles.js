const { default: colors } = require('styles/colors');
import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Icone = styled.Image`
  width: ${({ size }) => (size ? size : 70)}px;
  height: ${({ size }) => (size ? size : 70)}px;
  margin-top: ${Platform.OS === 'ios' ? '-10px' : '0px'};
`;

export const barStyles = {
  showIcon: true,
  style: {
    backgroundColor: colors.PRIMARY,
    height: 48,
  },
  activeTintColor: colors.WHITE,
  inactiveTintColor: colors.LIGHT_GRAY,
  indicatorStyle: { backgroundColor: colors.WHITE },
};
