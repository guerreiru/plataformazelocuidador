import styled from 'styled-components/native';
import colors from '../../styles/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const Description = styled.Text`
  font-size: 16px;
  font-weight: 500;
  color: ${colors.PRIMARY};
  width: 300px;
`;

export const Label = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.BLACK_TRANSP(67)};
`;

export const ContainerButton = styled.View``;

export const Text = styled.Text`
  font-size: 14px;
  font-weight: 400;
  color: ${colors.BLACK_TRANSP(67)};
`;

export const Area = styled.View`
  margin-vertical: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
`;

export const Info = styled.View``;

export const IconInfo = styled(Icon)`
  color: ${colors.SECONDARY};
  font-size: 25px;
`;

export const BoxText = styled.Text``;
