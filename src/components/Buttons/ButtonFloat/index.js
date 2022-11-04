import React from 'react';

import { ContainerFloat, Icon } from './styles';
import colors from '../../../styles/colors';

const ButtonFloat = ({ onPress = () => {}, color }) => {
  return (
    <ContainerFloat color={color} onPress={onPress}>
      <Icon size={24} name="plus" color={colors.WHITE} />
    </ContainerFloat>
  );
};

export default ButtonFloat;
