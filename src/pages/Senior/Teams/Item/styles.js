import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'styles/colors';

export const ContainerItem = styled.View`
  flex: 1;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.LIGHT_GRAY};
`;

export const ContentText = styled.View`
  flex: 1;
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-top: 5px;
`;

export const ContainerAvatar = styled.View`
  margin-right: 20px;
  margin-top: 10px;
`;

export const Content = styled.TouchableOpacity`
  flex: 8;
  flex-direction: row;
`;

export const TitleItem = styled.Text`
  margin-top: 14px;
  font-size: 16px;
`;

export const LabelItem = styled.Text`
  font-size: 14px;
  color: ${colors.PRIMARY};
  margin-bottom: ${({ marginBottom = 0 }) => `${marginBottom}px`};
`;

export const ContainerIcon = styled.TouchableOpacity`
  padding-top: 16px;
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.LIGHT_GRAY};
`;

export const Icon = styled(MIcon)`
  font-size: 24px;
  color: ${colors.PRIMARY};
`;

export const DateItem = styled.Text`
  font-size: 14px;
  color: ${colors.LABEL};
  margin-bottom: 10px;
`;
export const IconText = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const IconChat = styled.ImageBackground`
  width: 32px;
  height: 32px;
  align-items: center;
  padding-top: 3px;
`;

export const LinkChat = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 50px;
  padding-right: 10px;
  padding-top: 10px;
`;
