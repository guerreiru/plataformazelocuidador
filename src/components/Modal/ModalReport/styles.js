import styled from 'styled-components/native';
import colors from '../../../styles/colors';

export const View = styled.Modal``;

export const ContainerImag = styled.View`
  justify-content: center;
  align-items: center;
`;
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.BLACK_TRANSP(65)};
`;

export const ContainerButton = styled.View`
  margin-bottom: 20px;
`;

export const Imag = styled.Image`
  width: 40px;
  height: 60px;
  margin-bottom: 25px;
`;

export const Card = styled.View`
  width: 70%;
  height: 35%;
  background-color: ${colors.WHITE};
  border-radius: 5px;
  margin-bottom: 16px;
  shadow-opacity: 0.22;
  shadow-radius: 2.62px;
  justify-content: center;
  align-items: center;
  elevation: 2;
`;

export const Header = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${colors.SUBTITLE};
  text-align: center;
`;

export const Message = styled.Text`
  font-size: 16px;
  color: ${colors.ITEM.SUBDESCRIPTION};
`;

export const Content = styled.View`
  padding: 24px;
`;
