import React, { useState, useEffect } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { useSenior, useAuth, useModal, useTeam } from 'hooks';
import { formatDate } from 'utils/date';
import CaregiverCategories from 'enums/CaregiverCategories';
import formatProfession from 'utils/formatProfessional';
import sendOnWhatpsApp from 'utils/sendOnWhatsApp';
import AvatarDefault from 'Images/AvatarDefault.png';
import ButtonLink from 'components/Buttons/ButtonLink';
import THE_SENIOR from 'utils/formatSenior';
import usePhoto from 'hooks/usePhoto';
import ItemInfo from 'components/ItemInfo';
import Button from 'components/Buttons/Button';
import colors from 'styles/colors';
import Modal from 'components/Modal';
import Page from 'components/Page';

import {
  ContainerAvatar,
  ContainerButton,
  Avatar,
  Line,
  ContainerButtonModal,
} from './styles';

const ViewProfile = ({ route }) => {
  const { setUseModal, renderUseModal } = useModal();
  const { item: member, hasProfessional, typeCaregiver } = route.params;
  const { senior } = useSenior();
  const { member: item, getMember } = useTeam();
  const { disengage } = useAuth(false);
  const { user } = useSelector((state) => state.auth);
  const [isVisibleModalQuestion, setIsVisibleModalQuestion] = useState(false);
  const [photo, setPhoto] = useState(AvatarDefault);
  const { getPhotoByProfessional, getPhotoByCaregiver } = usePhoto();

  const renderButtonDisengage = () => {
    if (
      senior &&
      senior.caregiver.length > 0 &&
      senior.caregiver[0].id === user.id
    ) {
      return (
        <ContainerButton>
          <Button
            label={'DESVINCULAR DA EQUIPE'}
            onPress={() => setIsVisibleModalQuestion(true)}
          />
        </ContainerButton>
      );
    }
    return null;
  };

  const updatePhoto = async () => {
    let _photo;
    if (hasProfessional) {
      _photo = await getPhotoByProfessional(item.id);
    } else {
      _photo = await getPhotoByCaregiver(item.id);
    }
    setPhoto(_photo);
  };

  const loadMember = async () =>
    await getMember(senior.id, member.id, hasProfessional);

  useEffect(() => {
    loadMember();
  }, []);

  useEffect(() => {
    if (item) {
      updatePhoto();
    }
  }, [item]);

  const navigation = useNavigation();
  const handleSubmit = async () => {
    const response = await disengage(senior.id, item.id, {
      disengage_reason: `Desvinculado por ${user.full_name}`,
      disengage_date: new Date(),
    });
    if (response) {
      setIsVisibleModalQuestion(false);
      setUseModal();
    }
  };

  const renderButton = (label, _item, memberType = 'PROFESSIONAL') => {
    let mobile;
    let hasWhatsapp = false;

    if (_item.phone_number) {
      mobile = '+55' + _item.phone_number.replace(/\D/g, '');
    }

    if (memberType === 'PROFESSIONAL') {
      if (_item.phone_number && _item.is_whatsapp && _item.is_whatsapp_shared) {
        hasWhatsapp = true;
      }
    } else {
      if (_item.phone_number && _item.is_whatsapp) {
        hasWhatsapp = true;
      }
    }

    if (hasWhatsapp) {
      return (
        <Button
          label={label}
          onPress={() => {
            sendOnWhatpsApp(' ', mobile);
          }}
        />
      );
    } else {
      return null;
    }
  };

  const renderProfessionalItem = (_item) => (
    <>
      <ItemInfo label={'Nome completo'} description={_item.full_name} />
      <Line />
      <ItemInfo
        label={'Formação'}
        description={formatProfession(_item.profession, _item.gender)}
      />
      <Line />
      {renderAccompaniesSince(_item.accompanies_since)}
      <ContainerButton>
        {renderButton(
          'FALAR COM O PROFISSIONAL DE SAÚDE',
          _item,
          'PROFESSIONAL',
        )}
      </ContainerButton>
    </>
  );

  const renderAccompaniesSince = (accompanies_since) => {
    if (accompanies_since) {
      return (
        <>
          <ItemInfo
            label={'Acompanha desde'}
            description={formatDate(accompanies_since)}
          />
          <Line />
        </>
      );
    }
    return null;
  };

  const renderCaregiverItem = (_item) => (
    <>
      <ItemInfo label={'Nome completo'} description={_item.full_name} />
      <Line />
      <ItemInfo label={'Grupo'} description={_item.type_caregiver} />
      <Line />
      {renderAccompaniesSince(_item.accompanies_since)}
      <ContainerButton>
        {renderButton('  FALAR COM O MEMBRO  ', _item, 'CAREGIVER')}
      </ContainerButton>
      {renderButtonDisengage()}
    </>
  );

  const renderModalQuestion = () => {
    if (isVisibleModalQuestion) {
      return (
        <Modal
          title={'Tem certeza disso?'}
          message={`${
            item.full_name
          } não fará mais parte da equipe de cuidados ${
            THE_SENIOR.THE_PREPOSITION[senior.gender.toUpperCase()]
          } 
                  ${
                    THE_SENIOR.THE_TREATMENT_PRONOUN[
                      senior.gender.toUpperCase()
                    ]
                  } ${senior.full_name}.`}
          visible={isVisibleModalQuestion}
          footer={
            <ContainerButtonModal>
              <ButtonLink
                label={'CANCELAR'}
                fontWeight={800}
                onPress={() => setIsVisibleModalQuestion(false)}
                color={colors.PRIMARY}
              />
              <ButtonLink
                label={'CONFIRMAR'}
                fontWeight={800}
                onPress={handleSubmit}
                color={colors.PRIMARY}
              />
            </ContainerButtonModal>
          }
        />
      );
    }
  };

  const getScreenName = () => {
    switch (typeCaregiver) {
      case CaregiverCategories.CAREGIVER:
        return 'Caregivers';
      case CaregiverCategories.FAMILY:
        return 'Relatives';
    }
  };

  if (!item) {
    return null;
  }

  return (
    <Page hasSidePadding={false}>
      <ContainerAvatar>
        <Avatar source={photo} resizeMode="contain" />
      </ContainerAvatar>
      <Line />
      {hasProfessional
        ? renderProfessionalItem(item)
        : renderCaregiverItem(item)}

      {renderModalQuestion()}
      {renderUseModal({
        title: 'Pronto',
        message: `${item.full_name} não faz mais parte da equipe de cuidados  ${
          THE_SENIOR.THE_PREPOSITION[senior.gender.toUpperCase()]
        } ${THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]} ${
          senior.full_name
        }.`,
        onPress: () => {
          const popToTopAction = StackActions.pop(2);
          Promise.all([navigation.dispatch(popToTopAction)]).then(() =>
            navigation.navigate('Teams', { screen: getScreenName() }),
          );
        },
      })}
    </Page>
  );
};

export default ViewProfile;
