import React from 'react';

import { Button, Icon } from './styles';
import colors from '../../styles/colors';

export default ({ onPress, tintColor, iconName }) => {
  if (!onPress) {
    return null;
  }
  return (
    <Button onPress={onPress}>
      <Icon
        name={iconName || 'arrow-back'}
        color={tintColor || colors.PRIMARY}
      />
    </Button>
  );
};
