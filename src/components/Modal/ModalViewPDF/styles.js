import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../styles/colors';

export const Modal = styled.Modal``;

export const View = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${colors.PRIMARY};
`;

export const TouchableOpacity = styled.TouchableOpacity`
  margin-top: 10px;
  margin-bottom: 10px;
  align-items: center;
`;

export const TextClose = styled.Text`
  font-size: 16px;
  color: ${colors.WHITE};
`;
