import React from 'react';
import moment from 'moment';

import formatNameMedicine from 'utils/formatMedicine';
import ContainerItem from 'components/ContainerItem';
import { Description, Text, Container } from './styles';

const Item = ({ item, onPress }) => {
  return (
    <Container>
      <ContainerItem onPress={onPress}>
        <Description>{formatNameMedicine(item.medicine_name)}</Description>
        <Text>
          {item.event} em {moment(item.created_at).format('DD/MM/YYYY')}
        </Text>
      </ContainerItem>
    </Container>
  );
};

export default Item;
