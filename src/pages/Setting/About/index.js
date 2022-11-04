import React from 'react';
import { Linking } from 'react-native';

import logoZelo from 'Images/Prancheta_B.png';
import configs from 'configs';
import Page from 'components/Page';

import {
  Title,
  Description,
  Container,
  Image,
  Hyperlink,
  FooterContainer,
  Footer,
  Divider,
} from './styles';

const About = () => {
  return (
    <Page simple={false} hasSidePadding={false}>
      <Image source={logoZelo} resizeMode="contain" />
      <Container>
        <Title>O que é:</Title>
        <Description>
          A finalidade do Zelo é dar apoio na tomada de decisão no cuidado da
          pessoa idosa dependente a partir da interação entre profissionais de
          saúde, cuidadores e familiares, facilitando a comunicação entre eles e
          a sistematização das informações de cuidado.
        </Description>
      </Container>
      <Divider />
      <Container>
        <Title>Desenvolvido por:</Title>
        <Hyperlink
          onPress={() => Linking.openURL('http://lariisasaudedigital.com/')}>
          LARIISA: Saúde Digital - Fiocruz
        </Hyperlink>
        <Hyperlink onPress={() => Linking.openURL('https://www.great.ufc.br/')}>
          GREat UFC
        </Hyperlink>
        <Hyperlink onPress={() => Linking.openURL('https://avicena.in/')}>
          AVICENA
        </Hyperlink>
      </Container>
      <Divider />
      <Container>
        <Title>Saiba mais:</Title>
        <Hyperlink
          onPress={() =>
            Linking.openURL('http://zelo.lariisasaudedigital.com/')
          }>
          Página oficial do Zelo
        </Hyperlink>
      </Container>
      <FooterContainer>
        <Footer>{`Copyright \u00A9 2020 Zelo Versão ${configs.VERSION}`}</Footer>
      </FooterContainer>
    </Page>
  );
};

export default About;
