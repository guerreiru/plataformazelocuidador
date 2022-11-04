import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import colors from '../../styles/colors';

const { height, width } = Dimensions.get('window');

export const LoadingBg = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  height: ${height}px;
  width: ${width}px;
`;
export const LoadingBox = styled.View`
  background-color: #fff;
  width: 250px;
  padding-top: 25px;
  align-items: center;
  border-radius: 5px;
  border-color: #ccc;
  border-width: 1px;
`;

export const ActivityIndicator = styled.ActivityIndicator``;

export const Text = styled.Text`
  margin-top: 15px;
  color: ${colors.PRIMARY};
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 25px;
`;

export const Divisor = styled.View`
  background-color: ${colors.BLACK_TRANSP(1)};
  width: 100%;
  height: 1px;
  margin-top: 15px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 12px 15px;
`;

export const ButtonText = styled.Text`
  color: ${colors.ERROR};
  text-align: center;
  font-weight: 600;
`;

export const TextInfo = styled.Text`
  color: ${colors.BLACK_TRANSP(5)};
  text-align: center;
`;
