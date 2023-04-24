import React, { useState, useLayoutEffect } from 'react';

import NextButton from 'components/CustomNavButtons/NextButton';
import BackButton from 'components/CustomNavButtons/BackButton';
import InputMask from 'components/Inputs/InputMask';
import Select from 'components/Inputs/Select';
import Radio from 'components/Radio';
import Page from 'components/Page';

import {
  Title,
  ContainerTypes,
  ContainerDate,
  View,
  ContentDate,
  Divider,
  ContainerSelect,
} from './styles';
import { useEffect } from 'react';
import useIntercurrence from '../../../../hooks/useIntercurrence';
import useSenior from '../../../../hooks/useSenior';

const SearchIntercurrence = ({ navigation, ...route }) => {
  const [filterType, setFilterType] = useState(null);
  const {  getIntercurrences } = useIntercurrence();
  const { senior } = useSenior();
  const [date, setDate] = useState({ initial: null, end: null });
  const [type, setType] = useState(null);
  const [intercurrenceTypeSelectItems, setIntercurrenceTypeSelectItems] = useState([
    { label: 'Infecção', value: 'Infecção' },
    { label: 'Internação hospitalar', value: 'Internação hospitalar' },
    { label: 'Lesão na pele por pressão', value: 'Lesão na pele por pressão' },
    { label: 'Queda', value: 'Queda' },
    { label: 'Óbito', value: 'Óbito' },
  ]);

  const loadIntercurrence = async () => {
    const _intercurrence = await getIntercurrences(senior.id);
		const _seniorIntercurrenceTypes = [];

    Object.keys(_intercurrence).forEach((key) => {
      _seniorIntercurrenceTypes.push(_intercurrence[key].intercurrence_type);
    });
    const _seniorIntercurrenceTypesFiltered = [
      ...new Set(_seniorIntercurrenceTypes),
    ];
    
    const arraySelectItems = _seniorIntercurrenceTypesFiltered.map(type => ({
        label: type,
        value: type,
        name: type,
      })
    );
    
		setIntercurrenceTypeSelectItems(arraySelectItems);
  };

  useEffect(() => {
    loadIntercurrence()
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          tintColor="white"
          iconName="close"
          onPress={() => navigation.navigate('Intercurrence')}
        />
      ),
      headerRight: () => (
        <NextButton
          onPress={() =>
            navigation.navigate('Intercurrence', { filters: { date, type } })
          }
        />
      ),
    });
  }, [navigation, date, type]);

  return (
    <Page hasSidePadding={false}>
      <ContainerSelect>
        <Select
          label="Tipo da busca"
          value={filterType}
          options={[
            { label: 'Por período da intercorrência', value: 'DATE' },
            { label: 'Por tipo da intercorrência', value: 'TYPE' },
          ]}
          handleChange={(value) => {
            if (value === 'DATE') {
              setType(null);
            } else {
              setDate({ initial: null, end: null });
              setType('Infecção');
            }
            setFilterType(value);
          }}
        />
      </ContainerSelect>
      {filterType && <Divider />}
      {renderFilter()}
    </Page>
  );

  function renderFilter() {
    if (filterType === 'TYPE') {
      return (
        <ContainerTypes>
          <Title>Por tipo da intercorrência</Title>
          <Radio
            name={'types'}
            options={intercurrenceTypeSelectItems}
            value={type}
            fontStyle="normal"
            handleChange={(value) => setType(value)}
          />
        </ContainerTypes>
      );
    }
    if (filterType === 'DATE') {
      return (
        <ContainerDate>
          <Title>Por período da intercorrência</Title>
          <ContentDate>
            <View>
              <InputMask
                label="Desde"
                placeholder="DD/MM/AAAA"
                name="dateInitial"
                value={date.initial}
                mask={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                handleChange={(value) => setDate({ ...date, initial: value })}
              />
            </View>
            <View>
              <InputMask
                label="Até"
                placeholder="DD/MM/AAAA"
                name="dateInitial"
                value={date.end}
                mask={'datetime'}
                options={{
                  format: 'DD/MM/YYYY',
                }}
                handleChange={(value) => setDate({ ...date, end: value })}
              />
            </View>
          </ContentDate>
        </ContainerDate>
      );
    }

    return null;
  }
};

export default SearchIntercurrence;
