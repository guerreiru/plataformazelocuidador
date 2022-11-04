import styled from 'styled-components/native';
import WebView from 'react-native-webview';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'styles/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.WHITE};
`;

export const Title = styled.Text`
  font-size: 16px;
  color: ${colors.BLACK_TRANSP('87')};
  margin: 16px;
`;

export const Divider = styled.View`
  width: 100%;
  margin-bottom: 8px;
  border: 1px solid ${colors.BLACK_TRANSP('14')};
`;

export const ContainerVideos = styled.FlatList`
  flex: 1;
  padding-horizontal: 16px;
`;

export const Image = styled.ImageBackground`
  min-height: 240px;
  border-radius: 4px;
  margin-vertical: 5px;
  background-color: ${colors.BLACK};
  border: 1px solid ${colors.BLACK};
`;

export const ContainerPlayer = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
`;

export const ContainerTitle = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${colors.BLACK_TRANSP(7)};
  padding-vertical: 3px;
`;

export const TitleVideo = styled.Text`
  color: ${colors.WHITE};
  align-self: center;
  margin-left: 10px;
  max-width: 80%;
  font-size: 16px;
`;

export const Player = styled(MIcon)`
  color: ${colors.WHITE_TRANSP(5)};
  font-size: 50px;
  margin-right: 5px;
`;

export const YouTubeVideo = styled(WebView)`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  margin-vertical: 5px;
`;

export const ViewPlayer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${colors.BLACK};
`;
