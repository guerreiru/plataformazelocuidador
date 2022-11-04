import React, { createRef } from 'react';
import { YouTubeVideo, ViewPlayer } from './styles';

const VideoItem = ({ route, navigation }) => {
  const _youTubeRef = createRef();
  const { goBack } = navigation;

  if (!(route.params && route.params.video)) {
    return goBack();
  }

  const video = route.params.video;
  return (
    <ViewPlayer>
      <YouTubeVideo
        key={video.video_id}
        ref={_youTubeRef}
        javaScriptEnabled={true}
        allowsFullscreenVideo={true}
        source={{
          uri: `https://www.youtube.com/embed/${video.video_id}?rel=0&autoplay=0&showinfo=0`,
        }}
      />
    </ViewPlayer>
  );
};

export default VideoItem;
