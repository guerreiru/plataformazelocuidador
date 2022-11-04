import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 110px;
`;

export const Box = styled.View`
  width: 50px;
  height: 90px;
  flex-direction: row;
  align-items: center;
`;

export const Line1 = styled.View`
  background-color: ${colors.BLACK_TRANSP(3)};
  width: 100%;
  height: 2px;
  position: absolute;
  top: 22px;
`;

export const Line2 = styled.View`
  background-color: ${colors.BLACK_TRANSP(3)};
  width: 100%;
  height: 2px;
  position: absolute;
  top: 58px;
`;

export const ItemBox = styled.View`
  height: 30px;

  align-items: center;
  justify-content: center;
`;
export const ItemTxt = styled.Text`
  font-size: 25px;
`;

export const Dots = styled.Text`
  width: 10px;
  font-size: 25px;
  line-height: 22px;
  align-content: center;
  justify-content: center;
`;
