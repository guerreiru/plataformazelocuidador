import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Container, IconColor, IconGray, Label } from './styles';

function stringToBoolean(str) {
  if (!str || str === 'null' || str === 'undefined' || str === 'false') {
    return false;
  }
  return true;
}

export default function Checkbox(props) {
  const { value, handleChange, label } = props;
  const renderIcon = () => {
    if (stringToBoolean(value)) {
      return <IconColor name={'check-box'} />;
    }
    return <IconGray name={'check-box-outline-blank'} />;
  };
  const changeValue = () => {
    const res = `${!stringToBoolean(value)}`;
    return res;
  };

  const renderLabel = () => {
    if (typeof label === 'string') {
      return <Label>{label}</Label>;
    }
    return label;
  };

  return (
    <Container>
      <TouchableOpacity
        onPress={(ev) => {
          handleChange(changeValue());
        }}>
        {renderIcon()}
      </TouchableOpacity>
      {renderLabel()}
    </Container>
  );
}
