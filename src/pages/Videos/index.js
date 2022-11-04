import React from 'react';

import useVideo from 'hooks/useVideo';
import {
  Container,
  ContainerVideos,
  Title,
  Divider,
  Image,
  ContainerPlayer,
  Player,
  TitleVideo,
  ContainerTitle,
} from './styles';

export default function Videos({ navigation }) {
  const { navigate } = navigation;
  const { videos } = useVideo();

  return (
    <Container>
      <Title>
        Preparamos alguns vídeos para ajudar você no cuidado da pessoa idosa.
      </Title>
      <Divider />
      <ContainerVideos
        data={videos}
        keyExtractor={(item) => item.video_id}
        renderItem={({ item }) => (
          <Image
            resizeMode="cover"
            source={{
              uri: `https://img.youtube.com/vi/${item.video_id}/mqdefault.jpg`,
            }}>
            <ContainerPlayer
              onPress={() => navigate('VideoPlayer', { video: item })}>
              <ContainerTitle>
                <TitleVideo>{item.name || ''}</TitleVideo>
                <Player name="play-circle-outline" />
              </ContainerTitle>
            </ContainerPlayer>
          </Image>
        )}
      />
    </Container>
  );
}
