import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Container = styled.ScrollView`
  flex: 1;
  padding-left: 16px;
  padding-top: 16px;
  background-color: ${colors.WHITE};
`;

export const Title = styled.Text`
  font-size: 20px;
  color: ${colors.PRIMARY};
  margin-bottom: 8px;
`;
