import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import HomeRoutes from './home.routes';

import Colors from 'styles/colors';
import VideoRoutes from './video.routes';
import SettingsRoutes from './settings.routes';
import WarningsRoutes from './warning.routes';

import HomeActiveImg from 'Images/inicio_on.png';
import HomeDisabledImg from 'Images/inicio_off.png';

import PlayActiveImg from 'Images/play_on.png';
import PlayDisabledImg from 'Images/play_off.png';

import SettingActiveImg from 'Images/ajustes_on.png';
import SettingDisabledImg from 'Images/ajustes_off.png';

import WarningActiveImg from 'Images/avisos_on.png';
import WarningDisabledImg from 'Images/avisos_off.png';

import WarningActiveNewWarning from 'Images/avisos_on_1.png';
import WarningDisabledNewWarning from 'Images/avisos_off_1.png';

import useAppState from 'hooks/useAppState';
import useIconeWarning from 'hooks/useIconeWarning';
import useLocalNotification from 'hooks/useLocalNotification';
import useUsageTimeAplication from 'hooks/useUsageTimeAplication';

import { ACTIVE, BACKGROUND } from 'enums/typesApplicationStates';

import { Icone } from './styles';
import UpdateTerms from 'pages/Terms/updateTerms';
import UpdateExtraTerms from 'pages/TermsExtra/updateTerms';

const AppStack = createBottomTabNavigator();

const TermStack = createStackNavigator();

const iconsImag = {
  Home: {
    active: HomeActiveImg,
    disabled: HomeDisabledImg,
  },
  VideoRoutes: {
    active: PlayActiveImg,
    disabled: PlayDisabledImg,
  },
  SettingsRoutes: {
    active: SettingActiveImg,
    disabled: SettingDisabledImg,
  },
  Warning: {
    active: WarningActiveImg,
    activeNewWarning: WarningActiveNewWarning,
    disabledNewWarning: WarningDisabledNewWarning,
    disabled: WarningDisabledImg,
  },
};

export default function Route() {
  const { Navigator, Screen } = AppStack;

  const { Navigator: TermsNavigator, Screen: TermsSceen } = TermStack;
  const { appStateVisible } = useAppState();
  const { setStartTime, storeUsageTimeAplication } = useUsageTimeAplication();
  const mustAcceptTerms = useSelector((state) => state.app.mustAcceptTerms);
  const { status } = useIconeWarning();
  useLocalNotification();

  useEffect(() => {
    if (appStateVisible === ACTIVE) {
      setStartTime({ start_time: new Date() });
    }
  }, [appStateVisible]);

  useEffect(() => {
    if (appStateVisible === BACKGROUND) {
      storeUsageTimeAplication();
    }
  }, [appStateVisible]);

  if (mustAcceptTerms) {
    return (
      <TermsNavigator
        tabBarOptions={{
          style: { backgroundColor: Colors.PRIMARY },
          activeTintColor: Colors.WHITE,
          inactiveTintColor: Colors.LIGHT_GRAY,
        }}>
        <TermsSceen
          name="UpdateTerms"
          component={UpdateTerms}
          options={{ title: 'Termos de Uso' }}
        />
        <TermsSceen
          name="UpdateExtraTerms"
          component={UpdateExtraTerms}
          options={{ title: 'Termos de Uso' }}
        />
      </TermsNavigator>
    );
  }

  return (
    <Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === 'Warning') {
            const { active, disabled, activeNewWarning, disabledNewWarning } =
              iconsImag[route.name];
            if (focused) {
              return (
                <Icone
                  size={size}
                  source={status ? activeNewWarning : active}
                  resizeMode="contain"
                />
              );
            } else {
              return (
                <Icone
                  size={size}
                  source={status ? disabledNewWarning : disabled}
                  resizeMode="contain"
                />
              );
            }
          }
          const { active, disabled } = iconsImag[route.name];
          return (
            <Icone
              size={size}
              source={focused ? active : disabled}
              resizeMode="contain"
            />
          );
        },
      })}
      tabBarOptions={{
        style: { backgroundColor: Colors.PRIMARY },
        activeTintColor: Colors.WHITE,
        inactiveTintColor: Colors.LIGHT_GRAY,
      }}>
      <Screen
        name="Home"
        component={HomeRoutes}
        options={{ title: 'Início' }}
      />

      <Screen
        name="VideoRoutes"
        component={VideoRoutes}
        options={{ title: 'Videos' }}
      />

      <Screen
        name="SettingsRoutes"
        component={SettingsRoutes}
        options={{ title: 'Ajustes' }}
      />

      <Screen
        name="Warning"
        component={WarningsRoutes}
        options={{ title: 'Avisos' }}
      />
    </Navigator>
  );
}
