import styled from 'styled-components/native';
import colors from 'styles/colors';

export const Background = styled.ScrollView`
  background-color: ${colors.BLACK_TRANSP('07')};
  padding: 16px;
  border-radius: 4px;
`;

export const Page = styled.ScrollView`
  padding: 20px;
  background-color: ${colors.WHITE};
`;

export const PageAccept = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${colors.WHITE};
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 15px;
`;

export const Strong = styled.Text`
  font-weight: bold;
`;

export const TextTerm = styled.Text`
  font-size: 14px;
`;

export const Hyperlink = styled.Text`
  font-size: 14px;
  margin-bottom: 60px;
  color: ${colors.PRIMARY};
  font-weight: 600;
  text-align: center;
`;

export const SubTitleTerm = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ContainerButton = styled.View`
  width: 156px;
  align-self: center;
  margin-top: 20px;
`;
