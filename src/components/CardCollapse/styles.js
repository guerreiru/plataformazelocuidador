import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Animated, Platform } from 'react-native';

import colors from '../../styles/colors';

export const Container = styled.TouchableOpacity`
  background-color: ${colors.WHITE};
  border-radius: 8px;
  margin-bottom: 16px;
  shadow-opacity: 0.22;
  shadow-radius: 2.62px;
  ${Platform.OS === 'ios'
    ? `
    shadow-offset: 0px 0px;
    `
    : ''}
  elevation: 2;
  border-bottom-left-radius: 0;
`;

export const ContentFade = styled(Animated.View)`
  height: ${({ active }) => (active ? 'auto' : 0)};
  overflow: hidden;
`;

export const Row = styled.View`
  padding: 19px 16px 19px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Divider = styled.View`
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.07);
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.PRIMARY};
`;

export const Icon = styled(MIcon)``;
