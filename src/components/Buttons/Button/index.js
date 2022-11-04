import React from 'react';
import { ButtonFormat, Label } from './styles';

export default function Button({ label, onPress, disabled, ...rest }) {
  return (
    <ButtonFormat onPress={onPress} disabled={disabled} {...rest}>
      <Label> {label}</Label>
    </ButtonFormat>
  );
}
