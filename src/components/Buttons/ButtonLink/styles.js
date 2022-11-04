import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  min-width: 50px;
  min-height: 36px;
`;

export const Label = styled.Text`
  color: ${({ color }) => color};
  font-weight: ${({ fontWeight }) => `${fontWeight}`};
  font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
`;
