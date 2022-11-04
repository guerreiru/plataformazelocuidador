import React, { useEffect } from 'react';
import { StackActions } from '@react-navigation/native';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import ItemMedicine from 'components/ItemMedicine';
import colors from 'styles/colors';
import Page from 'components/Page';
import NoInformation from 'components/NoInformation';
import ImgNoMedicines from 'Images/Medicines.png';
import useMedicines from 'hooks/useMedicines';
import useSenior from 'hooks/useSenior';

import {
  Container,
  Title,
  Subtitle,
  Icon,
  ContainerDate,
  TitleDate,
  Divider,
  Content,
} from './styles';

const Medicines = ({ navigation }) => {
  const { navigate } = navigation;
  const { senior } = useSenior();

  const { getMedicines, medicines, clearMedicines } = useMedicines(senior);

  const getTheTreathmentPronoun = (gender) =>
    gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.';

  useEffect(() => {
    getMedicines();
    return clearMedicines;
  }, []);

  return (
    <>
      {medicines && medicines.length > 0 ? (
        <Page hasSidePadding={false}>
          <Container>
            <ContainerDate>
              <Icon name="calendar-blank" size={24} color={colors.PRIMARY} />
              <TitleDate>
                {format(new Date(), `EEEE',' d 'de' MMMM 'de' yyyy`, {
                  locale: pt,
                })}
              </TitleDate>
            </ContainerDate>
            <Title>Olá, {senior.full_name}</Title>
            <Subtitle>
              Esta é a rotina de medicamentos{' '}
              {getTheTreathmentPronoun(senior.gender)} {senior.full_name} para
              hoje.
            </Subtitle>
          </Container>
          <Divider />
          <Content>
            {medicines.map((item, index) => {
              return (
                <ItemMedicine
                  sourceScreen={'CARE_PLAN'}
                  key={index + '_medicine_item'}
                  item={item}
                  index={index}
                  hasButtonChangeTime={item.reference_time}
                  onPress={() => navigate('ViewMedicine', { item: item })}
                />
              );
            })}
          </Content>
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

export default Medicines;
