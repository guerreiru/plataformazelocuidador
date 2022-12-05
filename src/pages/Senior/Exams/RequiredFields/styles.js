import styled from 'styled-components/native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Button from 'components/Buttons/Button';
import colors from '../../../../styles/colors';

export const Text = styled.Text`
  color: ${colors.TEXT_GRAY_SECONDARY};
  line-height: 19px;
  text-align: center;
`;

export const Header = styled.Text`
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${colors.TEXT_GRAY_SECONDARY};
  margin-bottom: 4px;
`;

export const RequiredFieldsList = styled.View`
  margin-top: 32px;
  align-items: flex-start;
  padding: 0 16px;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
`;

export const Icon = styled(MaterialIcon)`
  color: ${({ color }) => (color ? color : colors.PRIMARY)};
  font-size: ${({ size }) => (size ? `${size}px` : '32px')};
  margin-right: 8px;
`;

export const IconContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonStyled = styled(Button)`
  min-width: 100px;
`;
