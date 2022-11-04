import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import colors from '../../styles/colors';

export const Button = styled.TouchableOpacity`
  padding-left: 10px;
`;

export const CustomButton = styled.TouchableOpacity`
  padding-right: 15px;
`;

export const Icon = styled(MIcon)`
  font-size: 25px;
`;

export const SimpleButton = styled.TouchableOpacity`
  padding-right: 20px;
`;

export const SimpleText = styled.Text`
  font-size: 14px;
  color: ${colors.WHITE};
`;
