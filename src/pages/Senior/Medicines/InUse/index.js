import React, { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';

import ItemMedicine from 'components/ItemMedicine';
import ImgNoMedicines from 'Images/Medicines.png';
import NoInformation from 'components/NoInformation';
import useMedicines from 'hooks/useMedicines';
import useSenior from 'hooks/useSenior';
import Page from 'components/Page';

import { Title } from './styles';

const InUse = ({ navigation, route }) => {
  const { navigate } = navigation;
  const { senior } = useSenior();
  const { getMedicines, medicines, clearMedicines } = useMedicines(senior);

  const getTheTreathmentPronoun = (gender) =>
    gender === 'MASCULINO' ? 'ao Sr.' : 'a Srª.';

  useEffect(() => {
    getMedicines();
    return clearMedicines;
  }, []);

  return (
    <>
      {medicines && medicines.length > 0 ? (
        <Page hasSidePadding={16}>
          <Title>
            Veja os medicamentos que {getTheTreathmentPronoun(senior.gender)}{' '}
            {senior.full_name} está usando atualmente.
          </Title>
          {medicines.map((item) => (
            <ItemMedicine
              key={item.id}
              item={item}
              hasButtonChangeTime={item.reference_time}
              onPress={() => navigate('ViewMedicine', { item: item })}
            />
          ))}
        </Page>
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

export default InUse;
