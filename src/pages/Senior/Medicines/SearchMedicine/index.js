import React, { useState, useLayoutEffect } from 'react';

import NextButton from 'components/CustomNavButtons/NextButton';
import BackButton from 'components/CustomNavButtons/BackButton';
import Radio from 'components/Radio';
import Page from 'components/Page';

import { Title, ContainerTypes } from './styles';

const SearchMedicine = ({ navigation }) => {
  const [type, setType] = useState('incluído');
  const typeOptions = [
    { label: 'Medicamento incluído', value: 'incluído' },
    { label: 'Medicamento alterado', value: 'alterado' },
    { label: 'Medicamento excluído', value: 'excluído' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          tintColor="white"
          iconName="close"
          onPress={() => navigation.navigate('Register')}
        />
      ),
      headerRight: () => (
        <NextButton
          onPress={() => navigation.navigate('Register', { filters: { type } })}
        />
      ),
    });
  }, [navigation, type]);

  return (
    <Page hasSidePadding={false}>
      <ContainerTypes>
        <Title>Por tipo de registro</Title>
        <Radio
          name={'types'}
          options={typeOptions}
          value={type}
          fontStyle="normal"
          handleChange={(value) => setType(value)}
        />
      </ContainerTypes>
    </Page>
  );
};

export default SearchMedicine;
