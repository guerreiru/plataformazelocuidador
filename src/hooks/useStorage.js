import AsyncStorage from '@react-native-async-storage/async-storage';
import configs from '../configs';
import { errorHandler } from '../utils/index';

export default function useStorage(key) {
  const { STORAGE_KEY } = configs;
  return [
    async function save(data) {
      try {
        return await AsyncStorage.setItem(
          `${STORAGE_KEY}:${key}`,
          JSON.stringify(data),
        );
      } catch (error) {
        errorHandler(
          new Error(
            'Erro ao guardar as informações offline. Por favor, entre em contato com o administrador do sistema',
          ),
        );
      }
    },
    async function get() {
      try {
        const data = await AsyncStorage.getItem(`${STORAGE_KEY}:${key}`);
        if (data) {
          const res = JSON.parse(data);
          return res;
        }
        return null;
      } catch (error) {
        // errorHandler(
        //   new Error(
        //     'Erro ao recuperar as informações offline. Por favor, entre em contato com o administrador do sistema',
        //   ),
        // );
      }
    },
    async function remove() {
      try {
        AsyncStorage.removeItem(`${STORAGE_KEY}:${key}`);
      } catch (error) {
        errorHandler(
          new Error(
            'Erro ao remover as informações offline. Por favor, entre em contato com o administrador do sistema',
          ),
        );
      }
    },
  ];
}
