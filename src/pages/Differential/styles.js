import styled from 'styled-components/native';
import colors from 'styles/colors';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

const sizes = {
  fontSize: '20px',
  buttonWidth: '104px',
  buttonHeight: '36px',
};
if (width <= 320) {
  sizes.fontSize = '16px';
  sizes.buttonWidth = '80px';
  sizes.buttonHeight = '30px';
}

export const Page = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${colors.WHITE};
`;

export const Container = styled.View`
  flex: 3;
  align-items: center;
`;

export const ContainerPagination = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Description = styled.Text`
  font-size: ${sizes.fontSize};
  margin-bottom: 10px;
  color: ${colors.PRIMARY};
`;

export const ContainerButton = styled.View`
  flex: 1;
  align-items: flex-end;
  margin-top: 30px;
`;

export const ButtonSkip = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 36px;
  margin: 10px;
  padding: 4px 20px;
  border-radius: 3px;
  color: ${colors.PRIMARY};
  border: 1px solid ${colors.PRIMARY};
`;

export const Label = styled.Text`
  color: ${({ primary }) => (primary ? colors.PRIMARY : colors.WHITE)};
  font-weight: 500;
  font-size: 14px;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background: ${({ disabled }) =>
    disabled ? colors.LIGHT_GRAY : colors.PRIMARY};
  border-radius: 4px;
  min-width: ${sizes.buttonWidth};
  height: ${sizes.buttonHeight};
  padding-horizontal: 16px;
`;

export const Hidden = styled.View`
  min-width: ${sizes.buttonWidth};
  height: ${sizes.buttonHeight};
`;
