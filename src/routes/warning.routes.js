import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WarningMessage from 'pages/Warning/WarningMessage';
import useIconeWarning from 'hooks/useIconeWarning';
import Warning from 'pages/Warning';
import colors from 'styles/colors';

const WarningStack = createStackNavigator();

export default function SettingsRoutes({ navigation }) {
  const { Navigator, Screen } = WarningStack;
  const { status, deactivate } = useIconeWarning();

  useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e) => {
      if (status) {
        deactivate();
      }
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.WHITE,
      }}>
      <Screen
        name="Warning"
        component={Warning}
        options={{ title: 'Avisos' }}
      />
      <Screen
        name="WarningMessage"
        component={WarningMessage}
        options={{ title: 'Avisos' }}
      />
    </Navigator>
  );
}
