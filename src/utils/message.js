import { Alert } from 'react-native';

export const message = {
  error: (error) => {
    if (typeof error === 'string') {
      Alert.alert('Atenção', error);
    } else {
      Alert.alert('Atenção', 'Erro não identificado no app.');
    }
  },
  info: (title, txt) => {
    Alert.alert(title, txt);
  },
  success: (txt) => {
    Alert.alert('Zelo informa', txt);
  },
  confirm: (txt) => {
    return new Promise((resolve) => {
      Alert.alert(
        'Confirmação',
        txt,
        [
          {
            text: 'Não',
            onPress: () => () => resolve(false),
            style: 'cancel',
          },
          { text: 'Sim', onPress: () => resolve(true) },
        ],
        { cancelable: false },
      );
    });
  },
};
