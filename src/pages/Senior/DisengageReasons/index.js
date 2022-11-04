import React from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';

import MyForm from 'components/Forms';
import Page from 'components/Page';

import THE_SENIOR from 'utils/formatSenior';
import { REGEX_NAME, setValidationField } from 'utils';

import useAuth from 'hooks/useAuth';
import useModal from 'hooks/useModal';
import useSenior from 'hooks/useSenior';
import useFormAlertDisengageReasons from 'hooks/useFormAlertDisengageReasons';
import { Title, ContainerTitle } from './styles';

const DisengageReasons = ({ route }) => {
  const { renderUseModal, setUseModal } = useModal();
  const { myDisengage } = useAuth(false);
  const { senior } = useSenior();
  const navigation = useNavigation();
  const popToTopAction = StackActions.popToTop();

  const handleSubmit = async (data) => {
    const response = await myDisengage(senior.id, data);

    if (response) {
      setUseModal();
    }
  };

  const fields = [
    {
      name: 'disengage_reason',
      label: 'Motivo do desvínculo',
      placeholder: 'Ex: A pedido da família',
      validation: setValidationField(
        REGEX_NAME,
        'Só são permitidas letras (A-Z), acentos e espaços',
      )
        .required('Este campo não pode ficar em branco')
        .min(2, 'Nome deve ter ao menos 2 caracteres')
        .trim(),
    },
  ];

  const { setRefs } = useFormAlertDisengageReasons(navigation, handleSubmit);

  return (
    <>
      <Page>
        <ContainerTitle>
          <Title>
            {`Informe abaixo o motivo pelo qual está se desvinculando ${
              THE_SENIOR.THE_PREPOSITION[senior.gender.toUpperCase()]
            }${THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]}${
              senior.full_name
            }`}
          </Title>
        </ContainerTitle>
        <MyForm fields={fields} setRefs={setRefs} handleSubmit={() => {}} />
      </Page>
      {renderUseModal({
        onPress: () => {
          navigation.dispatch(popToTopAction);
        },
        title: 'Pronto!',
        message: `Você não faz mais parte da equipe de cuidados ${
          THE_SENIOR.THE_PREPOSITION[senior.gender]
        } ${THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]} ${
          senior.full_name
        }.`,
      })}
    </>
  );
};

export default DisengageReasons;
