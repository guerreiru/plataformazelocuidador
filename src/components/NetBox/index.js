import React from 'react';
import { Container, Icon, Text, SafeAreaView } from './styles';

const NetBox = () => {
  return (
    <Container>
      <SafeAreaView>
        <Icon name="portable-wifi-off" />
        <Text> Sem conexão </Text>
      </SafeAreaView>
    </Container>
  );
};

export default NetBox;
