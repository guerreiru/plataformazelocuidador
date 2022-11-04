import React from 'react';
import { Container, Message, IconError } from './styles';

export default function ErrorDateTime() {
  return (
    <Container>
      <IconError name="close" />
      <Message>{`Ops... 
      Verificamos que a data e hora do seu dispositivo não corresponde à data e hora atual.

      Por favor verifique nas configurações do seu aparelho para continuar a utilizar a Plataforma Zelo.`}</Message>
    </Container>
  );
}
