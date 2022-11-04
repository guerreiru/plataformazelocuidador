import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Register from 'pages/Senior/Medicines/Register';
import colors from 'styles/colors';
import InUse from 'pages/Senior/Medicines/InUse';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function Medicines() {
  const styles = { borderTopWidth: 0.2, borderTopColor: colors.LIGHT_GRAY };
  return (
    <Navigator
      style={styles}
      tabBarOptions={{
        style: {
          backgroundColor: colors.PRIMARY,
          height: 48,
        },
        labelStyle: { fontWeight: '500', fontSize: 14 },
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.LIGHT_GRAY,
        indicatorStyle: { backgroundColor: colors.WHITE },
      }}>
      <Screen name="InUse" component={InUse} options={{ title: 'EM USO' }} />
      <Screen
        name="Register"
        component={Register}
        options={{ title: 'REGISTRO' }}
      />
    </Navigator>
  );
}

export default Medicines;
