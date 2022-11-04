import React from 'react';
import { Button, Label } from './styles';
import colors from '../../../styles/colors';

export default function ButtonLink({
  label,
  onPress,
  color = colors.PRIMARY,
  fontSize = 14,
  fontWeight = 500,
  ...rest
}) {
  const renderLabel = () => {
    if (typeof label === 'string') {
      return (
        <Label fontSize={fontSize} fontWeight={fontWeight} color={color}>
          {label}
        </Label>
      );
    }
    return label;
  };

  return (
    <Button onPress={onPress} {...rest}>
      {renderLabel()}
    </Button>
  );
}
