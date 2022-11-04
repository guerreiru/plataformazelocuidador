import styled from 'styled-components/native';
import colors from 'styles/colors';

export const ContainerLink = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2px;
`;

export const ContainerCard = styled.View`
  flex-direction: column;
  background-color: red;
`;

export const LabelLink = styled.Text`
  color: ${colors.PRIMARY};
  font-size: 14px;
  font-weight: 500;
`;

export const Link = styled.TouchableOpacity``;

export const ContainerBlock = styled.View`
  flex-direction: row;
`;

export const Left = styled.View`
  flex: 8;
  padding-right: 10px;
`;
export const Right = styled.View`
  flex: 1;
  border-left-width: 1px;
  border-left-color: #c8c8c8;
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 10px;
  justify-content: center;
  align-items: center;
`;
export const IconText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const Icon = styled.ImageBackground`
  width: 32px;
  height: 32px;
  align-items: center;
  padding-top: 3px;
`;

export const LinkChat = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 50px;
`;
