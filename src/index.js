import React from 'react';
import { StatusBar, SafeAreaView, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
//TODO: troca por expo
//import codePush from 'react-native-code-push';

import configs, { URLS } from './configs';
import { Store } from './store';

import PushNotificationProvider from './components/PushNotificationProvider';
import Routes from './routes';
import colors from './styles/colors';
import ChatProvider from './components/ChatProvider';

function MyApp() {
  const renderInfo = () => {
    let txt = null;
    if (configs.BASE_URL.API === URLS.PRODUCTION.API) {
      txt = null;
    } else if (configs.BASE_URL.API === URLS.HOMOLOGA.API) {
      txt = 'Testes';
    } else {
      txt = 'Desenvolvimento';
    }

    if (txt) {
      const _style = {
        backgroundColor: txt === 'Desenvolvimento' ? '#333' : colors.SECONDARY,
        color: txt === 'Desenvolvimento' ? '#fff' : '#333',
        textAlign: 'center',
        fontWeight: 'bold',
      };
      return (
        <SafeAreaView style={{ backgroundColor: colors.PRIMARY }}>
          <Text style={_style}>Versão de {txt}</Text>
        </SafeAreaView>
      );
    }
    return null;
  };

  const renderStatusBar = () => {
    if (configs.BASE_URL.API === URLS.PRODUCTION.API) {
      return <StatusBar translucent backgroundColor={colors.PRIMARY} />;
    }
    return null;
  };

  return (
    <>
      {renderInfo()}
      {renderStatusBar()}
      <NavigationContainer>
        <Provider store={Store}>
          <Routes />
          <PushNotificationProvider />
          <ChatProvider />
        </Provider>
      </NavigationContainer>
    </>
  );
}

export default MyApp;
