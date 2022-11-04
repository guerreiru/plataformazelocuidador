import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ButtonModal = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  height: 36px;
  width: 60px;
  margin-left: 20px;
`;

export const TextButtonModal = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.PRIMARY};
`;

export const ContainerCheck = styled.View`
  margin: 0 0 0 -10px;
`;
