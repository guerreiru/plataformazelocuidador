import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import VideoItem from 'pages/Videos/VideoItem';
import Videos from 'pages/Videos';
import colors from 'styles/colors';

import { barStyles } from './styles';

const VideoStack = createStackNavigator();

export default function VideoRoutes() {
  const { Navigator, Screen } = VideoStack;
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.WHITE,
      }}>
      <Screen
        name="Videos"
        component={Videos}
        options={{ title: 'Vídeos', ...barStyles }}
      />
      <Screen
        name="VideoPlayer"
        component={VideoItem}
        options={{ title: 'VideoPlayer', ...barStyles }}
      />
    </Navigator>
  );
}
