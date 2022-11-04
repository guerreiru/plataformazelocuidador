import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Container = styled.View`
  background-color: ${colors.WHITE};
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 15px 20px;
  flex: 1;
  margin-top: 100px;
`;

export const Imag = styled.Image`
  width: 80px;
  height: 80px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.BLACK_TRANSP(87)};
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.BLACK_TRANSP(67)};
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

export const DateTime = styled.Text`
  font-size: 14px;
  color: ${colors.BLACK_TRANSP(36)};
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
`;
