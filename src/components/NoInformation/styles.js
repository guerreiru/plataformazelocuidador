import styled from 'styled-components/native';
import colors from '../../styles/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const sizes = {
  fontSize: '16px',
  imageSize: '232px',
};
if (width <= 320) {
  sizes.fontSize = '14px';
  sizes.imageSize = '140px';
}

export const Container = styled.View`
  background-color: ${colors.WHITE};
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  padding: 0px 20px;
  ${({ fullPage }) => (fullPage ? 'flex: 1;' : 'height: 60%')}
`;

export const Description = styled.Text`
  font-size: ${sizes.fontSize};
  color: ${({ fontColor }) =>
    fontColor === 'primary' ? colors.PRIMARY : colors.BLACK};
  margin-top: 16px;
  margin-bottom: 16px;
  text-align: center;
`;

export const Imag = styled.Image`
  max-width: ${sizes.imageSize};
  max-height: ${sizes.imageSize};
`;
