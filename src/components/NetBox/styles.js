import styled from 'styled-components/native';
import MCIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

export const Container = styled.View`
  background-color: ${colors.ERROR};
  width: 100%;
  min-height: 30px;
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  padding: 5px 3px;
`;

export const SafeAreaView = styled.SafeAreaView`
  flex-direction: row;
  justify-content: center;
`;

export const Icon = styled(MCIcon)`
  color: ${colors.WHITE}
  font-size: 20px;
`;

export const Text = styled.Text`
  color: ${colors.WHITE}
  font-size: 16px;
  line-height: 20px;
`;
