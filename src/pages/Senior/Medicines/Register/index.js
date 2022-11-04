import React, { useEffect, useState } from 'react';
import { StackActions } from '@react-navigation/native';

import NoInformation from 'components/NoInformation';
import ImgNoMedicines from 'Images/Medicines.png';
import useSenior from 'hooks/useSenior';
import useMedicines from 'hooks/useMedicines';
import Item from './Item';

import {
  Title,
  Footer,
  FlatList,
  FilterContainer,
  FilterTitle,
  FilterDisplay,
  FilterLabel,
  FilterClose,
  FilterIconClose,
  Divider,
} from './styles';

const Medicines = ({ route, navigation }) => {
  const [filters, setFilters] = useState({});
  const { push } = navigation;
  const { senior } = useSenior();
  const { getHistories, histories, clearHistories } = useMedicines(senior);

  const getTheTreathmentPronoun = (gender) =>
    gender === 'MASCULINO' ? 'ao Sr.' : 'a Srª';

  const renderFilter = {
    incluído: 'Inclusão',
    alterado: 'Alteração',
    excluído: 'Exclusão',
  };

  useEffect(() => {
    getHistories();
    return clearHistories;
  }, []);

  useEffect(() => {
    if (route.params && route.params.filters) {
      setFilters(route.params.filters);
    }
  }, [route]);

  const filterHistories = () => {
    let filtered = [...histories];
    if (filters.type) {
      filtered = [...histories].filter((history) => {
        const v = history.event.toUpperCase() === filters.type.toUpperCase();
        return v;
      });
    }
    return filtered;
  };

  return (
    <>
      {histories && histories.length > 0 ? (
        <FlatList
          data={filterHistories(histories || [])}
          keyExtractor={(item) => item._id + '_history'}
          renderItem={({ item }) => (
            <Item
              item={item}
              onPress={() => push('HistoryMedicine', { item })}
            />
          )}
          ListFooterComponent={() => <Footer />}
          ListHeaderComponent={() =>
            Object.keys(filters).length > 0 ? (
              <>
                <FilterContainer>
                  <FilterTitle>Filtro: </FilterTitle>
                  <FilterDisplay>
                    <FilterLabel>{renderFilter[filters.type]}</FilterLabel>
                    <FilterClose onPress={() => setFilters({})}>
                      <FilterIconClose name="close" />
                    </FilterClose>
                  </FilterDisplay>
                </FilterContainer>
                <Divider />
              </>
            ) : (
              <Title>
                Veja o registro de alterações nos medicamentos{' '}
                {getTheTreathmentPronoun(senior.gender)} {senior.full_name}.
              </Title>
            )
          }
        />
      ) : (
        <NoInformation
          imag={ImgNoMedicines}
          buttonLabel="FALAR COM PROFISSIONAL DE SAÚDE"
          description={`Ops... Não encontramos os medicamentos ${
            senior.gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.'
          } ${
            senior.full_name
          }. Os medicamentos devem ser cadastrados por um profissional de saúde.`}
          onPress={() => {
            const popToTopAction = StackActions.pop(2);
            Promise.all([navigation.dispatch(popToTopAction)]).then(() =>
              navigation.navigate('Teams', { screen: 'HealthProfessionals' }),
            );
          }}
        />
      )}
    </>
  );
};

export default Medicines;
