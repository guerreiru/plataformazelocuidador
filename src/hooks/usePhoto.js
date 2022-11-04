import * as FileSystem from 'expo-file-system';

import { useSelector } from 'react-redux';
import configs from '../configs';
import AvatarDefault from '../Images/AvatarDefault.png';

export default function usePhoto() {
  const photoUri = FileSystem.cacheDirectory + 'photos/';
  const { token } = useSelector((state) => state.auth);

  const checkFolder = async () => {
    const fileInfo = await FileSystem.getInfoAsync(photoUri);
    if (!fileInfo.exists) {
      await FileSystem.makeDirectoryAsync(photoUri, {
        intermediates: true,
      });
    }
  };

  const getPhoto = async (category, id) => {
    if (category && id) {
      try {
        await checkFolder();
        const { BASE_URL } = configs;
        const uri = `${photoUri}/temp_photo_${category}_${id}.jpg`;
        const response = await FileSystem.downloadAsync(
          `${BASE_URL.DOCUMENTS}documents/image/${category}/${id}`,
          uri,
          {
            md5: true,
            headers: {
              Authorization: 'Bearer ' + token,
            },
          },
        );

        if (response.status && response.status === 200) {
          return response;
        }
        return AvatarDefault;
      } catch (err) {
        return AvatarDefault;
      }
    }
  };

  const getPhotoByCaregiver = async (id) => {
    if (id) {
      return await getPhoto('caregiver-photo', id);
    }
    return AvatarDefault;
  };

  const getPhotoByProfessional = async (id) => {
    if (id) {
      return await getPhoto('professional-photo', id);
    }
    return AvatarDefault;
  };

  return {
    getPhotoByCaregiver,
    getPhotoByProfessional,
  };
}
