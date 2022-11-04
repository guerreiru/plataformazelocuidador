import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Alert, Platform } from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import { TYPES } from '../store/AuthReducer';
import configs from '../configs';
import ged from '../services/ged';

export default function useLoggedUserPhoto() {
  const dispatch = useDispatch();
  const { user, photo, token } = useSelector((state) => state.auth);
  const photoUri = FileSystem.documentDirectory + 'loggedUserPhoto/' + user.id;

  const setPhoto = (_photo) => {
    dispatch({ type: TYPES.UPDATED_PHOTO, payload: _photo });
  };

  const checkCameraPermission = async () => {
    const { status } = await await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Desculpe, nós precisamos da autorização para acessar a câmera para alterar imagens de perfil!',
      );
      return false;
    }
    return true;
  };

  const checkGaleryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Desculpe, nós precisamos da autorização para acessar imagens para alterar imagens de perfil!',
      );
      return false;
    }
    return true;
  };

  const sendToGed = async (data) => {
    let uploadData = new FormData();
    uploadData.append('id', user.id + '');
    uploadData.append('category', 'caregiver-photo');
    let imageType = `${data.mime}/${data.path.split('.').pop()}`;
    if (imageType === 'jpg') {
      imageType = 'jpeg';
    }

    uploadData.append('file', {
      type: `${data.mime}/${data.path.split('.').pop()}`,
      uri: data.path,
      name: data.path.split('/').pop(),
    });

    const url = 'documents/image';
    const res = await ged.post(url, uploadData);
    return res;
  };

  const deleteAllPhotosUnless = async (unless) => {
    const files = await FileSystem.readDirectoryAsync(photoUri);
    for (const file of files) {
      if (file !== unless) {
        await FileSystem.deleteAsync(`${photoUri}/${file}`);
      }
    }
  };

  const deleteAllPhotos = async () => {
    await deleteAllPhotosUnless(null);
  };

  const checkFolder = async () => {
    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(photoUri, {
        intermediates: true,
      });
    }
  };

  const _resizeImage = async (uri) => {
    const manipResult = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 600, height: 600 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG },
    );
    return manipResult;
  };

  const getCurrentPhoto = async () => {
    if (user && user.id && !photo.uri) {
      await checkFolder();
      const files = await FileSystem.readDirectoryAsync(photoUri);
      if (files.length > 0) {
        const _photoUri = `${photoUri}/${files[files.length - 1]}`;
        const _info = await FileSystem.getInfoAsync(_photoUri, { md5: true });
        if (_info.exists) {
          setPhoto({ uri: _photoUri });
        }
      }
    }
  };

  const refreshPhoto = async () => {
    if (user && user.id) {
      try {
        const { BASE_URL } = configs;
        const response = await FileSystem.downloadAsync(
          `${BASE_URL.DOCUMENTS}documents/image/caregiver-photo/${user.id}`,
          `${photoUri}/temp_photo.jpg`,
          {
            md5: true,
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        );

        if (response.status && response.status === 200) {
          const _info = await FileSystem.getInfoAsync(
            `${photoUri}/${response.md5}.jpg`,
          );
          if (!_info.exists) {
            const newPhotoUri = `${photoUri}/${response.md5}.jpg`;
            await FileSystem.moveAsync({
              from: response.uri,
              to: newPhotoUri,
            });
            setPhoto({ uri: newPhotoUri });
          }
          await deleteAllPhotosUnless(`${response.md5}.jpg`);
          return true;
        }
        throw new Error('Erro ao baixar');
      } catch (err) {
        return false;
      }
    }
  };

  const resolvePhoto = async () => {
    await getCurrentPhoto();
    await refreshPhoto();
  };

  const removePhoto = async () => {
    Alert.alert('Remover Foto?', '', [
      {
        text: 'Sim',
        onPress: async () => {
          await ged.delete(`documents/image/caregiver-photo/${user.id}`);
          setPhoto({});
          deleteAllPhotos();
        },
      },
      { text: 'Não' },
    ]);
  };

  const checkPermissions = async () => {
    if (Platform.OS !== 'web') {
      await checkCameraPermission();
      await checkGaleryPermission();
    }
  };

  useEffect(() => {
    resolvePhoto();
  }, []);

  useEffect(() => {
    checkPermissions();
  }, []);

  const pickFromCamera = async () => {
    if (!(await checkCameraPermission())) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync({
      width: 600,
      height: 600,
      aspect: [1, 1],
      quality: 0.8,
      includeBase64: true,
      allowsEditing: true,
      useFrontCamera: true,
      base64: true,
      cropping: true,
    });
    const resizedImage = await _resizeImage(image.uri);
    const res = await sendToGed({
      mime: image.type,
      path: resizedImage.uri,
    });
    await refreshPhoto();
    return res;
  };

  const pickFromGallery = async () => {
    if (!(await checkGaleryPermission())) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      width: 600,
      height: 600,
      aspect: [1, 1],
      quality: 0.8,
      includeBase64: true,
      allowsEditing: true,
    });
    const res = await sendToGed({
      mime: image.type,
      path: image.uri,
    });
    await refreshPhoto();
    return res;
  };

  return {
    photo,
    pickFromCamera,
    pickFromGallery,
    removePhoto,
    refreshPhoto,
  };
}
