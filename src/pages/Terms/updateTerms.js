import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';

import ButtonLeaked from 'components/Buttons/ButtonLeaked';
import useTerms from 'hooks/useTerms';
import useAuth from 'hooks/useAuth';
import Button from 'components/Buttons/Button';
import Terms from './index';

const UpdateTerms = ({ route, navigation }) => {
  const { navigate } = navigation;
  const { logout } = useAuth(false);
  const { acceptTerms, getCheckTerms } = useTerms();
  const [termId, setTermId] = useState(null);
  const [checkTerms, setCheckTerms] = useState(null);

  const initialize = async () => {
    const response = await getCheckTerms();

    setCheckTerms(response);
  };

  useEffect(() => {
    Alert.alert(
      'Nossos termos de uso foram atualizados.',
      `Por favor revise os novos termos e aceite para continuar utilizando a plataforma Zelo Saúde.`,
      [{ text: 'Revisar' }],
    );
    initialize();
  }, []);

  const accept = () => {
    if (!checkTerms.term_extra) {
      acceptTerms(termId, true);
      navigate('UpdateExtraTerms');
    } else {
      acceptTerms(termId);
    }
  };

  return (
    <SafeAreaView>
      <Terms
        setTermId={setTermId}
        route={route}
        navigation={navigation}
        showAccept={true}>
        <Button onPress={accept} label={'LI E ACEITO os termos de uso'} />
        <ButtonLeaked
          onPress={logout}
          fullWidth={true}
          label={'NÃO ACEITO os termos de uso'}
        />
      </Terms>
    </SafeAreaView>
  );
};

export default UpdateTerms;
