import styled from 'styled-components/native';
import colors from '../../../styles/colors';

export const ButtonFormat = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${({ disabled }) =>
    disabled ? colors.LIGHT_GRAY : colors.PRIMARY};
  border-radius: 3px;
  min-width: 172px;
  height: 36px;
  padding-horizontal: 16px;
`;

export const Label = styled.Text`
  color: ${colors.WHITE};
  font-weight: bold;
  font-size: 14px;
`;
