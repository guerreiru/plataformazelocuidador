import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import FormCPFFragment, { formFields } from 'components/Forms/FormCPFFragment';
import { getValidationSchema } from 'utils';
import { errorHandler } from 'utils/index';
import { Formik } from 'formik';
import { Label } from './styles';
import AddCaregiverItem from '../AddCaregiverItem';
import NoInformation from 'components/NoInformation';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import useAuth from 'hooks/useAuth';
import TeamImg from 'Images/team.png';
import Page from 'components/Page';

const CheckCPF = ({ route }) => {
  const [isVisibleCard, setIsVisibleCard] = useState(null);
  const [isNoInformation, setIsNoInformation] = useState(null);
  const { type_caregiver } = route.params;
  const { checkDuplicateCPFEmail, user } = useAuth(false);
  const { senior } = useSenior();
  const [caregiver, setCaregiver] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const { navigate } = useNavigation();

  function checkEqualityCaregiver(params) {
    if (params.hasOwnProperty('cpf')) {
      return params.cpf === user.cpf;
    } else {
      const formatEmail = params.email.toLowerCase();
      return formatEmail === user.email;
    }
  }

  function getLinkedGender(gender) {
    switch (gender) {
      case 'MASCULINO':
        return 'vinculado';
      case 'FEMININO':
        return 'vinculada';
      default:
        return 'vinculado(a)';
    }
  }

  const handelSubmit = async (data) => {
    if (!checkEqualityCaregiver(data)) {
      if (data.hasOwnProperty('email')) {
        data.email = data.email.toLowerCase();
      }
      data.senior_id = senior.id;
      const {
        duplicate,
        caregiver: _caregiver,
        hasAssociation,
      } = await checkDuplicateCPFEmail(data);

      if (duplicate) {
        if (hasAssociation) {
          errorHandler(
            `${_caregiver.full_name} já está ${getLinkedGender(
              _caregiver.gender,
            )} ${THE_SENIOR.THE_ARTICLE[senior.gender]}${
              THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender]
            }${senior.full_name}`,
          );
        } else {
          setCaregiver(_caregiver);
          setIsNoInformation(false);
          setIsVisibleCard(true);
        }
      } else {
        setIsVisibleCard(false);
        setIsNoInformation(true);
      }
    } else {
      errorHandler('Você está tentando se vincular');
    }
  };

  const renderCard = () => {
    if (!isVisibleCard) {
      return null;
    }
    return <AddCaregiverItem item={caregiver} typeCaregiver={type_caregiver} />;
  };

  const validationSchema = getValidationSchema(formFields);
  const renderNoInformation = () => {
    if (!isNoInformation) {
      return null;
    }
    return (
      <NoInformation
        fullPage={false}
        description={
          'Ops... Parece que o cuidador que você está procurando ainda não está cadastrado no Zelo. Tente novamente ou envie um convite.'
        }
        buttonLabel={`CONVIDAR ${type_caregiver.toUpperCase()}`}
        onPress={() =>
          navigate('RegisterCaregiver', { type_caregiver: type_caregiver })
        }
        imag={TeamImg}
      />
    );
  };
  return (
    <Page simple={false} hasBottomPadding={false}>
      <Label>
        {`Digite o CPF ou o e-mail da pessoa que você quer adicionar à equipe de cuidados${
          THE_SENIOR.THE_PREPOSITION[senior.gender.toUpperCase()]
        }${THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]}${
          senior.full_name
        }`}
      </Label>
      <Formik
        initialValues={{ email_cpf: '' }}
        validationSchema={validationSchema}>
        {(config) => (
          <FormCPFFragment
            config={config}
            disabled={disabled}
            onPress={handelSubmit}
            setDisabledButton={() => {
              setDisabled(false);
            }}
            onPressVisible={() => {
              setIsVisibleCard(false);
              setIsNoInformation(false);
              setDisabled(true);
            }}
          />
        )}
      </Formik>
      {renderCard()}
      {renderNoInformation()}
    </Page>
  );
};

export default CheckCPF;
