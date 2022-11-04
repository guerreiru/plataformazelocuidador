import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '../../../styles/colors';

export const Icon = styled(MIcon)``;

export const ContainerFloat = styled.TouchableOpacity`
  position: absolute;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  align-items: center;
  justify-content: center;
  right: 16px;
  bottom: 16px;
  background-color: ${({ color }) => color || colors.PRIMARY};
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0);
  border-bottom-width: 0;
  shadow-color: #000;
  shadow-offset: 2px;
  shadow-opacity: 0.6;
  shadow-radius: 2px;
  elevation: 2;
`;
