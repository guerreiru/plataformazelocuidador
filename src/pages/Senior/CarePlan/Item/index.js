import React from 'react';
import { Linking } from 'react-native';

import {
  ContainerItem,
  ContainerAvatar,
  Avatar,
  Content,
  ContainerIcon,
  Icon,
  TitleItem,
  LabelItem,
  ContentText,
  DateItem,
} from './styles';

const Item = ({ item }) => {
  if (!item) {
    return null;
  }
  return (
    <ContainerItem>
      <Content>
        <ContainerAvatar>
          <Avatar source={require('Images/AvatarDefault.png')} />
        </ContainerAvatar>
        <ContentText>
          <TitleItem>{item.full_name}</TitleItem>
          <LabelItem>{item.profession || item.type_caregiver}</LabelItem>
          <DateItem>{`Acompanha desde ${item.accompanies_since}`}</DateItem>
        </ContentText>
      </Content>
      {item.phone_number && (
        <ContainerIcon
          onPress={() =>
            Linking.openURL(
              `whatsapp://send?phone=+55${item.phone_number.replace(
                /\D/g,
                '',
              )}`,
            )
          }>
          <Icon name="message-text" />
        </ContainerIcon>
      )}
    </ContainerItem>
  );
};

export default Item;
