import styled from 'styled-components/native';
import colors from '../../styles/colors';

const FONT_SIZE = 16;

export const Container = styled.View`
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  align-self: stretch;
  margin-bottom: 20px;
`;

export const SwitchToggleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  align-self: stretch;
`;

export const ContainerText = styled.View`
  flex-direction: column;
  flex: 1;
  padding-right: 10px;
  width: 200px;
  min-height: 48px;
`;

export const Title = styled.Text`
  font-size: ${FONT_SIZE}px;
  color: ${({ highlighted, theme }) => {
    if (theme === 'dark') {
      return colors.WHITE;
    }
    if (theme === 'bold') {
      return colors.BLACK;
    }
    return highlighted ? colors.PRIMARY : colors.LABEL;
  }};
  font-weight: ${({ theme }) => {
    if (theme === 'bold') {
      return 700;
    }
    return 'inherit';
  }};

  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: ${FONT_SIZE}px;
  align-self: stretch;
  color: ${colors.LABEL};
`;

export const ErrorTxt = styled.Text`
  color: ${colors.ERROR};
  font-size: 14px;
`;
