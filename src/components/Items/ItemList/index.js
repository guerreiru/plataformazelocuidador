import React from 'react';

import { SubLabel, Label, Divider } from './styles';

const Item = ({ item }) => {
  if (item.value) {
    return (
      <>
        <Label>{item.title}</Label>
        <SubLabel>{item.value}</SubLabel>
        <Divider />
      </>
    );
  }
  return null;
};

const ItemList = ({ list }) => {
  return list.map((element, index) => <Item key={index} item={element} />);
};

export default ItemList;
