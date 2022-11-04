import React from 'react';
import { Container, Image } from './styles';

import logoZelo from 'Images/Prancheta_B.png';

export default function SplashScreen() {
  return (
    <Container>
      <Image source={logoZelo} resizeMode="contain" />
    </Container>
  );
}
