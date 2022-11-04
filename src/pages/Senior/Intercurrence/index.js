import React, { useEffect, useLayoutEffect, useState } from 'react';
import moment from 'moment';

import intercorrenciaImg from 'Images/intercorrencia.png';
import useIntercurrence from 'hooks/useIntercurrence';
import NoInformation from 'components/NoInformation';
import BackButton from 'components/CustomNavButtons/BackButton';
import useSenior from 'hooks/useSenior';
import Item from './Item';
import { formatDate } from 'utils/date';

import {
  FilterButton,
  FilterText,
  Footer,
  FlatList,
  FilterTitle,
  FilterDisplay,
  FilterLabel,
  FilterContainer,
  Divider,
  FilterIconClose,
  FilterClose,
} from './styles';

const Intercurrence = ({ navigation, route }) => {
  const [filters, setFilters] = useState({});
  const { senior } = useSenior();

  const getTheTreathmentPronoun = (gender) =>
    gender === 'MASCULINO' ? 'ao Sr.' : 'a Srª';

  const { intercurrences, getIntercurrences, clearIntercurrences } =
    useIntercurrence();

  useEffect(() => {
    if (route.params && route.params.filters) {
      setFilters(route.params.filters);
    }
  }, [route]);

  useEffect(() => {
    if (senior) {
      getIntercurrences(senior.id);
    }
    return clearIntercurrences;
  }, [senior]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: BackButton,
      headerRight: () => (
        <FilterButton
          onPress={() => navigation.navigate('SearchIntercurrence')}>
          <FilterText>FILTRAR</FilterText>
        </FilterButton>
      ),
    });
  }, [navigation]);

  const filterIntercurrences = () => {
    let filtered = [...intercurrences];
    if (filters) {
      if (filters.type) {
        filtered = [...intercurrences].filter(
          (el) => el.intercurrence_type === filters.type,
        );
      } else {
        if (filters.date && !!filters.date.initial) {
          filtered = filtered.filter(
            (el) =>
              moment(formatDate(el.date), 'DD/MM/YYYY') >=
              moment(filters.date.initial, 'DD/MM/YYYY'),
          );
        }
        if (filters.date && !!filters.date.end) {
          filtered = filtered.filter(
            (el) =>
              moment(formatDate(el.date), 'DD/MM/YYYY') <=
              moment(filters.date.end, 'DD/MM/YYYY'),
          );
        }
      }
    }

    return filtered;
  };

  const getComponentViewFilter = () => {
    const { type } = filters;
    if (type || (filters.date && (filters.date.initial || filters.date.end))) {
      return (
        <>
          <FilterContainer>
            <FilterTitle>Filtro: </FilterTitle>
            <FilterDisplay>
              <FilterLabel>
                {filters.type
                  ? filters.type
                  : `${filters.date.initial || 'DD/MM/AAAA'} - ${
                      filters.date.end || 'DD/MM/AAAA'
                    }`}
              </FilterLabel>
              <FilterClose onPress={() => setFilters({})}>
                <FilterIconClose name="close" />
              </FilterClose>
            </FilterDisplay>
          </FilterContainer>
          <Divider />
        </>
      );
    }
    return null;
  };

  return (
    <>
      {intercurrences && intercurrences.length > 0 ? (
        <FlatList
          data={filterIntercurrences(intercurrences || [])}
          keyExtractor={(item) => item.id + '_intercurrence'}
          renderItem={({ item }) => (
            <Item
              item={item}
              onPress={() => navigation.push('ViewIntercurrence', { item })}
            />
          )}
          ListFooterComponent={() => <Footer />}
          ListHeaderComponent={() => getComponentViewFilter()}
        />
      ) : (
        <NoInformation
          imag={intercorrenciaImg}
          description={`Ainda não há nenhuma intercorrência relacionada ${getTheTreathmentPronoun(
            senior.gender,
          )} ${senior.full_name}. Vamos te avisar se acontecer algo!`}
        />
      )}
    </>
  );
};

export default Intercurrence;
