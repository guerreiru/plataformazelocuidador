import styled from 'styled-components/native';
import colors from '../../styles/colors';

export const ContainerInfor = styled.View`
  flex-direction: column;
  align-self: flex-start;
  margin-bottom: 26px;
`;

export const Title = styled.Text`
  color: ${({ colorTitle }) => colorTitle};
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 3px;
`;

export const Description = styled.Text`
  color: ${colors.LABEL};
  font-size: 14px;
`;
