import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import useStorage from 'hooks/useStorage';

import SignUpPersonalData from 'pages/SignUp/PersonalData';
import SignUpLoginData from 'pages/SignUp/LoginData';
import ForgotPassword from 'pages/ForgotPassword';
import Differential from 'pages/Differential';
import InformCode from 'pages/ForgotPassword/InformCode';
import NewPass from 'pages/ForgotPassword/NewPass';
import Login from 'pages/Login';
import Terms from 'pages/Terms';
import TermsExtra from 'pages/TermsExtra';

import colors from 'styles/colors';

const AuthStack = createStackNavigator();

export default function AppRoutes() {
  const { Navigator, Screen } = AuthStack;
  const [skip, setSkip] = useState(undefined);
  const [, getSkipDiff] = useStorage('DIFFERENTIALS');

  const skipDiferentials = async () => {
    const _skip = await getSkipDiff();
    setSkip(_skip === undefined ? false : _skip);
  };

  useEffect(() => {
    skipDiferentials();
  }, []);

  if (skip === undefined) {
    return null;
  }

  return (
    <Navigator
      initialRouteName={skip ? 'Login' : 'Differential'}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.PRIMARY,
        },
        headerTintColor: colors.WHITE,
      }}>
      <Screen
        name="Differential"
        component={Differential}
        options={{ headerShown: false }}
      />

      <Screen name="Login" component={Login} options={{ headerShown: false }} />

      <Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: 'Recuperar senha' }}
      />
      <Screen
        name="InformCode"
        component={InformCode}
        options={{ title: 'Recuperar senha' }}
      />
      <Screen
        name="NewPass"
        component={NewPass}
        options={{ title: 'Recuperar senha' }}
      />

      <Screen
        name="SignUpLoginData"
        component={SignUpLoginData}
        options={{ title: 'Criar conta' }}
      />
      <Screen
        name="SignUpPersonalData"
        component={SignUpPersonalData}
        options={{ title: 'Criar conta' }}
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
