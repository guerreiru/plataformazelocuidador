import styled from 'styled-components/native';
import colors from '../../styles/colors';

const FONT_SIZE = 16;

export const Container = styled.View`
  justify-content: space-between;
  align-content: center;
  flex-direction: row;
  flex: 1.5;
  overflow: hidden;
  margin-bottom: 20px;
`;

export const SwitchToggleContainer = styled.View`
  flex-direction: column;
  justify-content: center;
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
    return highlighted ? colors.PRIMARY : colors.LABEL;
  }};
  flex: 1;
  margin-bottom: 10px;
`;

export const Description = styled.Text`
  font-size: ${FONT_SIZE}px;
  color: ${colors.LABEL};
`;

export const ErrorTxt = styled.Text`
  color: ${colors.ERROR};
  font-size: 14px;
`;
