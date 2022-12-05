import React, { useState, useLayoutEffect } from 'react';

import NextButton from 'components/CustomNavButtons/NextButton';
import BackButton from 'components/CustomNavButtons/BackButton';
import Radio from 'components/Radio';
import Page from 'components/Page';

import { Title, ContainerTypes } from './styles';

const SearchExam = ({ navigation, route }) => {
  const routeName = route.params.routeName;

  const [type, setType] = useState('incluído');
  const typeOptions = [
    { label: 'Data de criação do exame', value: 'date' },
    { label: 'Tipo do exame', value: 'commercial_name' },
    { label: 'Profissional solicitante', value: 'professional_name' },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          tintColor='white'
          iconName='close'
          onPress={() => navigation.goBack(routeName || 'Available')}
        />
      ),
      headerRight: () => (
        <NextButton
          onPress={() =>
            navigation.navigate(routeName || 'Available', { filters: { type } })
          }
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
          fontStyle='normal'
          handleChange={(value) => setType(value)}
        />
      </ContainerTypes>
    </Page>
  );
};

export default SearchExam;
