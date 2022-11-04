import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import { Title, Description } from './styles';
import useFormAlert from 'hooks/useFormAlert';
import useModal from 'hooks/useModal';
import useAuth from 'hooks/useAuth';
import MyForm from 'components/Forms';
import Page from 'components/Page';

export default function ConfigNotifications() {
  const { renderUseModal, setUseModal } = useModal();
  const navitation = useNavigation();
  const { updateUser } = useAuth(false);
  const { user } = useSelector((state) => state.auth);

  const { goBack } = useNavigation();

  const setValueConfiguration = (value) => {
    return value === 'true' ? null : new Date();
  };

  const getValueConfiguration = (value) => {
    return value ? 'false' : 'true';
  };

  const handleSubmit = async (data) => {
    const formatDate = {
      id: user.id,
      setting_date_new_health_problem: setValueConfiguration(
        data.setting_date_new_health_problem,
      ),
      setting_date_new_diagnosis: setValueConfiguration(
        data.setting_date_new_diagnosis,
      ),
      setting_date_new_intercurrence: setValueConfiguration(
        data.setting_date_new_intercurrence,
      ),
      setting_date_change_intercurrence: setValueConfiguration(
        data.setting_date_change_intercurrence,
      ),
    };

    const response = await updateUser(formatDate, false);
    if (response) {
      setUseModal();
    }
  };

  const { setRefs, handleConfirm, renderConfirm } = useFormAlert(
    navitation,
    handleSubmit,
  );

  const fields = [
    {
      name: 'setting_date_new_health_problem',
      type: 'switchToggle',
      label: 'Edições na lista de problemas',
      initialValue: getValueConfiguration(user.setting_date_new_health_problem),
    },
    {
      name: 'setting_date_new_diagnosis',
      type: 'switchToggle',
      label: 'Edições na lista de doenças',
      initialValue: getValueConfiguration(user.setting_date_new_diagnosis),
    },
    {
      name: 'setting_date_new_intercurrence',
      type: 'switchToggle',
      label: 'Novas intercorrências',
      initialValue: getValueConfiguration(user.setting_date_new_intercurrence),
    },
    {
      name: 'setting_date_change_intercurrence',
      type: 'switchToggle',
      label: 'Intercorrências editadas',
      initialValue: getValueConfiguration(
        user.setting_date_change_intercurrence,
      ),
    },
  ];

  return (
    <>
      <Page simple={false}>
        <Title>Você deseja ser avisado(a) sobre:</Title>
        <Description>
          Alguns avisos são configuráveis, selecione quais tipos de aviso você
          deseja continuar recebendo.
        </Description>
        <MyForm
          setRefs={setRefs}
          onSubmit={handleConfirm}
          submitText="SALVAR ALTERAÇÕES"
          fields={fields}
          minHeight={450}
          theme="dark"
        />
      </Page>
      {renderConfirm()}
      {renderUseModal({
        title: 'Tudo certo!',
        message: 'Os avisos foram alterados com sucesso!',
        onPress: () => {
          goBack();
        },
      })}
    </>
  );
}
