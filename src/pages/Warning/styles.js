import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Container = styled.View`
  margin-top: 30px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${colors.BLACK_TRANSP(87)};
  padding-bottom: 24px;
`;

export const List = styled.SectionList`
  background-color: ${colors.WHITE};
`;

export const Header = styled.Text`
  font-size: 14px;
  color: ${colors.BLACK_TRANSP(87)};
  font-weight: bold;
`;

export const ContainerHeader = styled.View`
  border-top-width: 1px;
  border-color: ${colors.RADIO_BORDER};
  padding-left: 10px;
  padding-top: 15px;
  padding-bottom: 12px;
`;
