import React, { useEffect } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HealthProfessionals from 'pages/Senior/Teams/HealthProfessionals';
import Caregivers from 'pages/Senior/Teams/Caregivers';
import Relatives from 'pages/Senior/Teams/Relatives';

import useSenior from 'hooks/useSenior';
import useTeam from 'hooks/useTeam';
import colors from 'styles/colors';

const { Navigator, Screen } = createMaterialTopTabNavigator();

const icons = {
  Caregivers: {
    name: 'home-heart',
    lib: MaterialCommunityIcons,
    _size: 28,
  },
  Relatives: {
    name: 'group',
    lib: FontAwesome,
    _size: 20,
  },
  HealthProfessionals: {
    name: 'briefcase-medical',
    lib: FontAwesome5,
    _size: 18,
  },
};

const style = { borderTopWidth: 0.2, borderTopColor: colors.LIGHT_GRAY };

import { barStyles } from './styles';

function Teams({ route }) {
  const { getTeams, clearTeams } = useTeam();
  const { senior } = useSenior();

  async function loadTeams() {
    if (senior && senior.id) {
      await getTeams(senior.id);
    } else {
      const { seniorId } = route.params;
      await getTeams(seniorId);
    }
    return clearTeams;
  }

  useEffect(() => {
    loadTeams();
  }, []);

  return (
    <Navigator
      screenOptions={({ route: _route }) => ({
        tabBarIcon: ({ color }) => {
          const { lib: Icon, name, _size } = icons[_route.name];
          return <Icon name={name} size={_size} color={color} />;
        },
      })}
      style={style}
      tabBarOptions={barStyles}>
      <Screen
        name="HealthProfessionals"
        component={HealthProfessionals}
        options={{ title: '' }}
      />
      <Screen
        name="Caregivers"
        component={Caregivers}
        options={{ title: '' }}
      />
      <Screen name="Relatives" component={Relatives} options={{ title: '' }} />
    </Navigator>
  );
}

export default Teams;
