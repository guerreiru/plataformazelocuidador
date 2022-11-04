import React, { useState, useEffect } from 'react';
import moment from 'moment';
import * as yup from 'yup';

import { useNavigation, StackActions } from '@react-navigation/native';
import { formatDate } from 'utils/date';
import CaregiverCategories from 'enums/CaregiverCategories';
import AvatarDefault from 'Images/AvatarDefault.png';
import ButtonLink from 'components/Buttons/ButtonLink';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import usePhoto from 'hooks/usePhoto';
import useModal from 'hooks/useModal';
import useAuth from 'hooks/useAuth';
import Button from 'components/Buttons/Button';
import MyForm from 'components/Forms';

import {
  ContainerItem,
  ContainerAvatar,
  Avatar,
  ContainerText,
  DateItem,
  TitleItem,
  ContainerCaregiverInfo,
  ContainerForm,
  Label,
  ContainerButton,
} from './styles';

const AddCaregiverItem = ({ item, typeCaregiver }) => {
  const { setUseModal, renderUseModal } = useModal();
  const [photo, setPhoto] = useState(AvatarDefault);
  const { getPhotoByCaregiver } = usePhoto();

  const [isVisibleButton, setIsVisibleButton] = useState(true);
  const [isVisibleForm, setIsVisibleForm] = useState(false);
  const { senior } = useSenior();
  const { engage } = useAuth(false);
  const navigation = useNavigation();

  const updatePhoto = async () => {
    const _photo = await getPhotoByCaregiver(item.id);
    setPhoto(_photo);
  };

  useEffect(() => {
    updatePhoto();
  }, [item]);

  const handleSubmitCaregiver = async ({ accompanies_since }) => {
    const response = await engage({
      senior_id: senior.id,
      caregiver_id: item.id,
      accompanies_since,
    });

    if (response) {
      setUseModal(true);
    }
  };

  const handleSubmitFamily = async () => {
    const response = await engage({
      senior_id: senior.id,
      caregiver_id: item.id,
    });

    if (response) {
      setUseModal(true);
    }
  };

  const renderBirthdate = () => {
    if (!item.birthdate) {
      return null;
    }
    return (
      <DateItem>{`Data de nascimento ${formatDate(item.birthdate)}`}</DateItem>
    );
  };

  const renderButton = () => {
    if (isVisibleButton && typeCaregiver === CaregiverCategories.FAMILY) {
      return <Button label={'CONFIRMAR'} onPress={handleSubmitFamily} />;
    }
    return null;
  };

  const renderButtonLink = () => {
    if (isVisibleButton && typeCaregiver === CaregiverCategories.CAREGIVER) {
      return (
        <ButtonLink
          label={'VINCULAR CUIDADOR(A)'}
          onPress={() => {
            setIsVisibleButton(false);
            setIsVisibleForm(true);
          }}
        />
      );
    }
    return null;
  };

  const renderForm = () => {
    if (isVisibleForm) {
      return (
        <>
          <Label>
            {`Desde quando ${item.full_name} acompanha ${
              THE_SENIOR.THE_ARTICLE[senior.gender]
            }\n${THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender]} ${
              senior.full_name
            }`}
          </Label>
          <MyForm
            onSubmit={handleSubmitCaregiver}
            submitText="CONFIRMAR"
            fields={[
              {
                name: 'accompanies_since',
                mask: 'datetime',
                placeholder: 'DD/MM/AAAA',
                options: {
                  format: 'DD/MM/YYYY',
                },
                validation: yup
                  .string()
                  .required('Este campo não pode ficar em branco')
                  .nullable()
                  .test('valid-date', 'Data no formato inválido', (value) => {
                    if (value) {
                      var aDate = moment(value, 'DD/MM/YYYY', true);
                      return aDate.isValid();
                    }
                    return true;
                  })
                  .test(
                    'valid-max-age',
                    'Data de Acompanhamento fora dos limites',
                    (value) => {
                      if (value) {
                        return (
                          moment().diff(moment(value, 'DD/MM/YYYY'), 'years') <=
                          130
                        );
                      }
                      return true;
                    },
                  )
                  .test(
                    'validate-data',
                    'A data de início do acompanhamento não deve ser anterior à data de nascimento do idoso.',
                    function (accompanies_since) {
                      const _accompaniesSince = moment(
                        accompanies_since,
                        'DD/MM/YYYY',
                        true,
                      );
                      const _birthdate = moment(
                        senior.birthdate,
                        'DD/MM/YYYY',
                        true,
                      );
                      if (
                        _accompaniesSince.isValid() &&
                        _birthdate.isValid() &&
                        _accompaniesSince < _birthdate
                      ) {
                        return false;
                      }
                      return true;
                    },
                  ),
              },
            ]}
          />
        </>
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

  return (
    <>
      <ContainerItem>
        <ContainerCaregiverInfo>
          <ContainerAvatar>
            <Avatar source={photo} />
          </ContainerAvatar>

          <ContainerText>
            <TitleItem>{item.full_name}</TitleItem>
            {renderBirthdate()}
          </ContainerText>
        </ContainerCaregiverInfo>
        <ContainerForm>
          {renderButtonLink()}
          {renderForm()}
          {renderUseModal({
            title: `${typeCaregiver} vinculado com sucesso!`,
            message: `${item.full_name} agora faz parte da equipe de cuidados ${
              THE_SENIOR.THE_PREPOSITION[senior.gender.toUpperCase()]
            }\n${
              THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]
            } ${senior.full_name}.`,
            onPress: () => {
              const popToTopAction = StackActions.pop(2);
              Promise.all([navigation.dispatch(popToTopAction)]).then(() =>
                navigation.navigate('Teams', { screen: getScreenName() }),
              );
            },
          })}
        </ContainerForm>
      </ContainerItem>
      <ContainerButton>{renderButton()}</ContainerButton>
    </>
  );
};

export default AddCaregiverItem;
