import React from 'react';
import { useSelector } from 'react-redux';
import debounce from 'lodash/debounce';

import useLoggedUserPhoto from 'hooks/useLoggedUserPhoto';
import colors from 'styles/colors';
import {
  Container,
  Image,
  Button,
  Icon,
  ButtonText,
  ButtonsContainer,
} from './styles';

const ProfilePhoto = ({ route }) => {
  const { edit } = { edit: false, ...route.params };
  const { user, photo } = useSelector((state) => state.auth);
  const { pickFromCamera, pickFromGallery, removePhoto } =
    useLoggedUserPhoto(user);

  return (
    <Container>
      <Image source={photo} />
      {!!edit && (
        <ButtonsContainer>
          <Button onPress={debounce(pickFromCamera)}>
            <Icon name="camera" />
            <ButtonText>Câmera</ButtonText>
          </Button>
          <Button onPress={debounce(pickFromGallery)}>
            <Icon name="folder-multiple-image" />
            <ButtonText>Galeria</ButtonText>
          </Button>
          {!!photo.uri && (
            <Button onPress={removePhoto}>
              <Icon name="trash-can" color={colors.ERROR} />
              <ButtonText color={colors.ERROR}>Remover</ButtonText>
            </Button>
          )}
        </ButtonsContainer>
      )}
    </Container>
  );
};

export default ProfilePhoto;
