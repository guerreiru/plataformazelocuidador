import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import useStorage from 'hooks/useStorage';

import NoInformation from 'components/NoInformation';
import ImgInstructions from 'Images/Instructions.png';
import ImgClinicalFunctionalEvaluation from 'Images/ClinicalFunctionalEvaluation.png';
import ImgTeam from 'Images/team.png';
import CarouselPage from './pagination';
import { Dimensions } from 'react-native';
import {
  Container,
  ContainerPagination,
  Description,
  ContainerButton,
  ButtonSkip,
  Label,
  Page,
  Button,
  Hidden,
} from './styles';

const { width } = Dimensions.get('window');

const Differential = ({ navigation }) => {
  const { navigate } = navigation;
  const [setSkipDiff] = useStorage('DIFFERENTIALS');

  const [page, setPage] = useState(0);
  let _carousel;
  const entries = [
    {
      imag: ImgInstructions,
      description:
        'Acompanhar e receber orientações sobre a rotina de cuidados da pessoa idosa através de lembretes, vídeos, informes e avisos.',
    },
    {
      imag: ImgTeam,
      description:
        'Comunicar-se facilmente com profissionais de saúde, cuidadores e familiares.',
    },
    {
      imag: ImgClinicalFunctionalEvaluation,
      description:
        'Ver as informações importantes registradas pelo profissional de saúde.',
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <NoInformation
        key={index}
        imag={item.imag}
        fontColor="primary"
        description={item.description}
      />
    );
  };

  return (
    <Page>
      <ContainerButton>
        <ButtonSkip
          onPress={async () => {
            await setSkipDiff(true);
            navigate('Login');
          }}>
          <Label primary>Pular</Label>
        </ButtonSkip>
      </ContainerButton>
      <Container>
        <Description>O Zelo ajuda você a...</Description>
        <Carousel
          ref={(c) => (_carousel = c)}
          data={entries}
          renderItem={_renderItem}
          onSnapToItem={(index) => setPage(index)}
          sliderWidth={Math.min(width - 20, 400)}
          itemWidth={Math.min(width - 20, 400)}
        />
      </Container>
      <ContainerPagination>
        {page !== 0 ? (
          <Button
            onPress={() => {
              _carousel.snapToItem(page - 1);
              setPage(page - 1);
            }}>
            <Label>Anterior</Label>
          </Button>
        ) : (
          <Hidden />
        )}

        <CarouselPage entries={entries} page={page} />
        <Button
          onPress={async () => {
            if (page + 1 >= entries.length) {
              await setSkipDiff(true);
              navigate('Login');
              return;
            }
            _carousel.snapToItem(page + 1);
            setPage(page + 1);
          }}>
          <Label>{page + 1 >= entries.length ? 'Começar' : 'Próximo'}</Label>
        </Button>
      </ContainerPagination>
    </Page>
  );
};

export default Differential;
