import styled from 'styled-components/native';
import colors from 'styles/colors';
import { Dimensions } from 'react-native';
import VIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const width = Dimensions.get('window').width;

export const Container = styled.View`
  background-color: ${colors.WHITE}
  flex: 1;
`;

export const Image = styled.Image`
  margin-top: 50px;
  width: ${width}px;
  height: ${width}px;
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

export const Button = styled.TouchableOpacity`
  background: ${colors.BLACK_TRANSP(1)};
  width: 80px;
  height: 80px;
  border-radius: 60px;
  margin-top: 20px;
  justify-content: center;
`;

export const Icon = styled(VIcon)`
  color: ${({ color }) => color || colors.PRIMARY};
  font-size: 30px;
  align-self: center;
`;

export const ButtonText = styled.Text`
  color: ${({ color }) => color || colors.PRIMARY};
  text-transform: uppercase;
  font-size: 12px;
  margin-top: 5px;
  text-align: center;
`;
