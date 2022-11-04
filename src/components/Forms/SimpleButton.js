import React from 'react';
import Button from '../Buttons/Button';
import { ContainerButton } from './styles';

export default function SimpleButton({ submitText, onPress, ...rest }) {
  return (
    <ContainerButton>
      <Button {...rest} label={submitText} onPress={onPress} />
    </ContainerButton>
  );
}
