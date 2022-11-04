import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';

import ButtonLeaked from 'components/Buttons/ButtonLeaked';
import useTerms from 'hooks/useTerms';
import useAuth from 'hooks/useAuth';
import Button from 'components/Buttons/Button';
import ExtraTerms from './index';

const UpdateTerms = ({ route, navigation }) => {
  const { logout } = useAuth(false);
  const { acceptExtraTerms } = useTerms();
  const [termId, setTermId] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const getDisabled = (value) => {
    setDisabled(value);
  };

  return (
    <SafeAreaView>
      <ExtraTerms
        setTermId={setTermId}
        route={route}
        getDisabled={getDisabled}
        navigation={navigation}
        showAccept={true}>
        <Button
          disabled={disabled}
          onPress={() => acceptExtraTerms(termId)}
          label={'LI E ACEITO os termos de uso'}
        />
        <ButtonLeaked
          onPress={logout}
          fullWidth={true}
          label={'NÃO ACEITO os termos de uso'}
        />
      </ExtraTerms>
    </SafeAreaView>
  );
};

export default UpdateTerms;
