import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Container = styled.View`
  flex-direction: column;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Divider = styled.View`
  border-width: 1px;
  border-color: ${colors.RADIO_BORDER};
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const Title = styled.Text`
  color: ${colors.BLACK_TRANSP(87)};
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 6px;
`;

export const Description = styled.Text`
  margin-top: 10px;
  color: ${colors.BLACK_TRANSP(67)};
  font-size: 14px;
`;

export const Hyperlink = styled.Text`
  color: ${colors.PRIMARY};
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const Footer = styled.Text`
  color: ${colors.BLACK_TRANSP(67)};
  font-size: 14px;
`;

export const FooterContainer = styled.View`
  align-items: center;
  padding-top: 15px;
`;

export const Image = styled.Image`
  width: 124px;
  height: 124px;
  margin-bottom: 20px;
  align-self: center;
  margin-top: 40px;
`;
