import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.TITLE};
  margin-bottom: 8px;
  font-weight: 600;
`;

export const Info = styled.Text`
  font-size: 12px;
  color: ${colors.BLACK_TRANSP(7)};
  margin-top: 5px;
  margin-bottom: 15px;
`;
