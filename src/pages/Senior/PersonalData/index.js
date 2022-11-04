import React from 'react';
import { useNavigation } from '@react-navigation/native';

import useFormAlertPersonalData from 'hooks/useFormAlertPersonalData';
import useSenior from 'hooks/useSenior';
import useModal from 'hooks/useModal';
import MyForm from './MyForm';
import Page from 'components/Page';

const PersonalData = () => {
  const { setUseModal, renderUseModal } = useModal();
  const navigation = useNavigation();
  const { goBack } = useNavigation();
  const { senior, updateSenior } = useSenior();

  const handleSubmit = async (data) => {
    const response = await updateSenior(data, senior.id);
    if (response) {
      setUseModal();
    }
  };

  const { setRefs, handleConfirm, renderModalConfirm, inforDeathSenior } =
    useFormAlertPersonalData(navigation, handleSubmit);

  return (
    <>
      <Page hasSidePadding={false}>
        {
          <MyForm
            handleSubmit={handleConfirm}
            setRefs={setRefs}
            senior={senior}
          />
        }
      </Page>
      {renderModalConfirm()}
      {renderUseModal({
        title: 'Tudo certo!',
        message: 'Os dados pessoais foram alterados com sucesso!',
        onPress: () => {
          goBack();
        },
      })}
      {inforDeathSenior({
        title: 'Atenção',
        message:
          'Foi registrado um óbito para o idoso. Por isso, não é possível inserir nem editar dados relacionados a esse Idoso.',
      })}
    </>
  );
};

export default PersonalData;
