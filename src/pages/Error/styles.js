import styled from 'styled-components/native';
import colors from 'styles/colors';
import IconCheck from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: ${colors.WHITE};
`;

export const IconError = styled(MaterialIcons)`
  color: ${colors.ERROR};
  font-size: 95px;
`;

export const IconSuccess = styled(IconCheck)`
  color: ${colors.PRIMARY};
  font-size: 65px;
`;

export const Message = styled.Text`
  font-size: 20px;
  margin-top: 20px;
  color: ${colors.INACTIVE_TAB_BAR};
  font-weight: bold;
  width: 70%;
  text-align: center;
`;

export const Icon = styled(MaterialIcons)`
  color: ${colors.ERROR};
  font-size: 60px;
`;
