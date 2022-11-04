import styled from 'styled-components/native';

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '172px')};
  height: 36px;
  margin: 10px;
  padding: 4px 20px;
  border-radius: 3px;
  color: ${(props) => props.borderColor};
  border: 1px solid ${(props) => props.borderColor};
  align-self: center;
`;

export const Label = styled.Text`
  color: ${(props) => props.textColor};
  font-weight: bold;
  font-size: 14px;
`;
