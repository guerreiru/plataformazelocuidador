import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ButtonModal = styled.TouchableOpacity`
  justify-content: center;
  align-items: flex-end;
  height: 40px;
  margin-right: 16px;
`;

export const TextButtonModal = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.PRIMARY};
`;

export const ContainerButton = styled.View`
  flex-direction: column;
`;

export const ContainerTimePicker = styled.View`
  width: 100%;
  margin-top: 20px;
  align-items: center;
`;
