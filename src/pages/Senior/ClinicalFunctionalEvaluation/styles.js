import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Container = styled.View`
  background-color: ${colors.WHITE};
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${colors.SUBTITLE};
  margin-bottom: 13px;
  min-height: 16px;
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.SUBTITLE};
  font-weight: 700;
  margin-bottom: 13px;
  min-height: 16px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${colors.LIGHT_GRAY};
`;

export const Title = styled.Text`
  font-size: 14px;
  color: rgba(0, 0, 0, 0.67);
  margin-bottom: 25px;
`;
