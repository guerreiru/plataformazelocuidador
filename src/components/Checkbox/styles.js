import styled from 'styled-components/native';
import colors from '../../styles/colors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px 10px 10px 0px;
`;

export const IconGray = styled(MaterialIcon)`
  color: ${colors.TEXT_GRAY};
  font-size: 28px;
`;

export const IconColor = styled(MaterialIcon)`
  color: ${colors.PRIMARY};
  font-size: 28px;
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
