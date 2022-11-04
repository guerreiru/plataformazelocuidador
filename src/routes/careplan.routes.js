import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Instructions from 'pages/Senior/CarePlan/Instructions';
import Medicines from 'pages/Senior/CarePlan/Medicines';
import colors from 'styles/colors';

const { Navigator, Screen } = createMaterialTopTabNavigator();

function CarePlan() {
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
      <Screen
        name="Instructions"
        component={Instructions}
        options={{ title: 'INSTRUÇÕES' }}
      />
      <Screen
        name="Medicines"
        component={Medicines}
        options={{ title: 'MEDICAMENTOS' }}
      />
    </Navigator>
  );
}

export default CarePlan;
