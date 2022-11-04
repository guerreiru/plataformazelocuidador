import styled from 'styled-components/native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'styles/colors';

export const ContainerItem = styled.View`
  flex: 1;
  flex-direction: row;
  height: 88px;
`;

export const ContentText = styled.View`
  flex: 1;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.LIGHT_GRAY};
`;

export const Avatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;

export const ContainerAvatar = styled.View`
  width: 56px;
  padding-top: 16px;
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
`;
