import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Container = styled.View`
  background-color: ${colors.WHITE};
  padding: ${({ padding }) => `${padding}px`};
`;

export const TouchableOpacity = styled.TouchableOpacity``;
