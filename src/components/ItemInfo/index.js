import React from 'react';
import { Container, Description, Label } from './styles';

const ItemInfo = ({ label, description }) => {
  return (
    <Container>
      <Label>{label}</Label>
      <Description>{description}</Description>
    </Container>
  );
};

export default ItemInfo;
