import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import colors from 'styles/colors';

import CaregiverPersonalData from 'pages/CaregiverPersonalData';
import ConfigNotifications from 'pages/Setting/ConfigNotifications';
import ChangePassword from 'pages/Setting/ChangePassword';
import ProfilePhoto from 'pages/ProfilePhoto';
import Setting from 'pages/Setting';
import About from 'pages/Setting/About';
import Terms from 'pages/Terms';
import TermsExtra from 'pages/TermsExtra';

const SettingsStack = createStackNavigator();

export default function SettingsRoutes() {
  const { Navigator, Screen } = SettingsStack;
  return (
    <Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.WHITE,
      }}>
      <Screen
        name="Setting"
        component={Setting}
        options={{ title: 'Ajustes' }}
      />
      <Screen
        name="CaregiverPersonalData"
        component={CaregiverPersonalData}
        options={{ title: 'Dados Pessoais' }}
      />
      <Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{ title: 'Alterar Senha' }}
      />
      <Screen
        name="NotificationsConfigs"
        component={ConfigNotifications}
        options={{ title: 'Avisos' }}
      />
      <Screen
        name="About"
        component={About}
        options={{ title: 'Sobre o Zelo' }}
      />
      <Screen
        name="ProfilePhoto"
        component={ProfilePhoto}
        options={{ title: 'Imagem de Perfil' }}
      />
      <Screen
        name="Terms"
        component={Terms}
        options={{ title: 'Termos e condições' }}
      />
      <Screen
        name="TermsExtra"
        component={TermsExtra}
        options={{ title: 'Termos e condições' }}
      />
    </Navigator>
  );
}
