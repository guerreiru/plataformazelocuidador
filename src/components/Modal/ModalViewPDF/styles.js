import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import { TextInput } from 'react-native';

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

export const PassTextInput = styled(TextInput)`
  margin: auto;
  margin-top: 16px;
  width: 100%;
  border: 1px solid #aaa;
  padding: 0 8px;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${({ color }) => color ? color : colors.PRIMARY};
`;

export const Footer = styled.View`
  flex-direction: ${({ direction }) => direction || 'row'};
  padding: 0px 8px 8px 24px;
  justify-content: flex-end;
`;