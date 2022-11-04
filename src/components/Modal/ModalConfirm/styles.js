import styled from 'styled-components/native';
import colors from '../../../styles/colors';

export const ButtonModal = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  min-height: 36px;
  min-width: 44px;
  padding-right: 20px;
`;

export const TextButtonModal = styled.Text`
  font-size: 14px;
  font-weight: 700;
  color: ${colors.PRIMARY};
`;
