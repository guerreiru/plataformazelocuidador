import React from 'react';

import { CustomButton, Icon, SimpleButton, SimpleText } from './styles';
import colors from '../../styles/colors';

export default ({
  onPress = () => {},
  name = 'check',
  label,
  simple = false,
}) => {
  if (simple) {
    return (
      <SimpleButton onPress={onPress}>
        <SimpleText>{label}</SimpleText>
      </SimpleButton>
    );
  }
  return (
    <CustomButton onPress={onPress}>
      <Icon name={name} color={colors.WHITE} />
    </CustomButton>
  );
};
