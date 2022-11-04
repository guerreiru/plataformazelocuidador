import React from 'react';
import { Button, Label } from './styles';
import colors from '../../../styles/colors';

export default function ButtonLeaked({
  fullWidth,
  label,
  onPress,
  borderColor = colors.PRIMARY,
  textColor = colors.PRIMARY,
}) {
  return (
    <Button onPress={onPress} borderColor={borderColor} fullWidth={fullWidth}>
      <Label textColor={textColor}>{label}</Label>
    </Button>
  );
}
