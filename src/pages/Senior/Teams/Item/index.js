import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

import { formatDate } from 'utils/date';
import { FAMILY } from 'enums/CaregiverCategories';
import formatProfession from 'utils/formatProfessional';
import sendOnWhatpsApp from 'utils/sendOnWhatsApp';
import AvatarDefault from 'Images/AvatarDefault.png';
import usePhoto from 'hooks/usePhoto';
import IconGray from '../../../../../assets/messagegrey.png';
import IconOrange from '../../../../../assets/mode_commentorange.png';
import IconChatDesactive from '../../../../../assets/Vector.png';

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
  IconChat,
  IconText,
  LinkChat,
} from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { TYPES as CHAT_TYPES } from 'store/ChatReducer';

const Item = ({
  item = {},
  hasProfessional = true,
  typeCaregiver,
  senior = {},
}) => {
  const { getPhotoByProfessional, getPhotoByCaregiver } = usePhoto();
  const dispatch = useDispatch();
  const [photo, setPhoto] = useState(AvatarDefault);
  const counter = useSelector((state) => {
    if (state.chat.data[senior.id] && state.chat.data[senior.id][item.id]) {
      return state.chat.data[senior.id][item.id].unreadCount;
    }
    return 0;
  });

  const updatePhoto = async () => {
    let _photo;
    if (hasProfessional) {
      _photo = await getPhotoByProfessional(item.id);
    } else {
      _photo = await getPhotoByCaregiver(item.id);
    }
    setPhoto(_photo);
  };

  useEffect(() => {
    updatePhoto();
  }, [item]);

  const { navigate } = useNavigation();
  if (!item) {
    return null;
  }

  const renderAccompaniesSince = (accompanies_since) => {
    if (accompanies_since) {
      return (
        <DateItem>{`Acompanha desde ${formatDate(
          accompanies_since,
        )}`}</DateItem>
      );
    }
    return null;
  };

  const renderProfession = (profession, gender, type_caregiver) => {
    if (profession) {
      return <LabelItem>{formatProfession(profession, gender)}</LabelItem>;
    } else {
      if (type_caregiver && type_caregiver !== FAMILY) {
        return <LabelItem marginBottom={10}>{type_caregiver}</LabelItem>;
      } else {
        return null;
      }
    }
  };

  const renderButtonChat = () => {
    const _myItem = {
      ...item,
      profession: item.profession || item.type_caregiver,
    };
    return (
      <LinkChat
        onPress={() => {
          dispatch({ type: CHAT_TYPES.USER_SELECTED, payload: _myItem });
          navigate('Chat');
        }}>
        {item.chat_active || item.chat_active === undefined ? (
          <IconChat
            source={counter > 0 ? IconOrange : IconGray}
            resizeMode="cover">
            {counter > 0 && <IconText>{counter}</IconText>}
          </IconChat>
        ) : (
          <IconChat source={IconChatDesactive} resizeMode="cover">
            {counter > 0 && <IconText>{counter}</IconText>}
          </IconChat>
        )}
      </LinkChat>
    );
  };

  // const renderButtonWhatsapp = () => {
  //   let mobile;

  //   if (item.phone_number) {
  //     mobile = '+55' + item.phone_number.replace(/\D/g, '');
  //   }

  //   if (
  //     hasProfessional &&
  //     item.phone_number &&
  //     item.is_whatsapp &&
  //     item.is_whatsapp_shared
  //   ) {
  //     return (
  //       <ContainerIcon
  //         onPress={() => {
  //           sendOnWhatpsApp(' ', mobile);
  //         }}>
  //         <Icon name="message-text" />
  //       </ContainerIcon>
  //     );
  //   } else if (!hasProfessional && item.phone_number && item.is_whatsapp) {
  //     return (
  //       <ContainerIcon
  //         onPress={() => {
  //           sendOnWhatpsApp(' ', mobile);
  //         }}>
  //         <Icon name="message-text" />
  //       </ContainerIcon>
  //     );
  //   } else {
  //     return null;
  //   }
  // };

  return (
    <ContainerItem>
      <Content
        onPress={() =>
          navigate('ViewProfile', {
            name: hasProfessional
              ? 'Profissional de saúde'
              : 'Membro da equipe',
            item: item,
            hasProfessional: hasProfessional,
            typeCaregiver: typeCaregiver,
          })
        }>
        <ContainerAvatar>
          <Avatar source={photo} />
        </ContainerAvatar>
        <ContentText>
          <TitleItem>{item.full_name}</TitleItem>
          {renderProfession(item.profession, item.gender, item.type_caregiver)}
          {renderAccompaniesSince(item.accompanies_since)}
        </ContentText>
      </Content>
      {renderButtonChat()}
    </ContainerItem>
  );
};

export default Item;
