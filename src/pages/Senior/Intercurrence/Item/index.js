import React from 'react';
import moment from 'moment';
import { Title, Description, Container, SubTitle } from './styles';
import ContainerItem from 'components/ContainerItem';

const Item = ({ item, onPress = () => {} }) => {
  return (
    <Container>
      <ContainerItem onPress={onPress}>
        <Title>{item.intercurrence_type}</Title>
        {item.custom_type_id && <SubTitle>(Outro)</SubTitle>}
        <Description>{`Registrada em ${moment(item.created_at).format(
          'DD/MM/YYYY',
        )}`}</Description>
        <Description>{`por ${item.full_name || 'Não informado'}`}</Description>
      </ContainerItem>
    </Container>
  );
};

export default Item;
