import styled from 'styled-components/native';
import colors from '../../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TextInputMask as InputMask } from 'react-native-masked-text';

export const TextInput = styled.TextInput`
  font-size: 14px;
  flex: 1;
  color: ${({ editable }) =>
    editable === false ? colors.INPUT.TEXT_DISABLED : colors.TEXT_GRAY};
  padding-top: 11px;
  padding-bottom: 10px;
  padding-left: 16px;
`;

export const Label = styled.Text`
  color: ${colors.LABEL};
  font-size: 14px;
`;

export const Error = styled.Text`
  color: ${colors.ERROR};
  font-size: 14px;
  margin-left: 20px;
  margin-right: 10px;
`;
export const ActionButton = styled(Icon)`
  color: ${colors.INPUT.BORDER};
  font-size: 20px;
`;
export const TextInputMask = styled(InputMask)`
  font-size: 14px;
  color: ${({ editable }) =>
    editable === false ? colors.INPUT.TEXT_DISABLED : colors.INPUT.TEXT};
  flex: 1;
  padding-top: 11px;
  padding-bottom: 10px;
  padding-left: 16px;
`;
