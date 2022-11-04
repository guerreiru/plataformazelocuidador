import React from 'react';
import { Container, Message, Icon } from './styles';
import NetBox from 'components/NetBox';

const Conectivity = () => {
  return (
    <Container>
      <NetBox />
      <Icon name="portable-wifi-off" />
      <Message>{`Conecte-se à internet. Você está off-line.`}</Message>
    </Container>
  );
};

export default Conectivity;
