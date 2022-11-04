import React, { Fragment } from 'react';
import { TouchableOpacity } from 'react-native';
import {
  Container,
  ContainerOption,
  ContainerOptionItem,
  IconColor,
  IconGray,
  Label,
  IconColorDot,
} from './styles';
import colors from '../../styles/colors';

export default function Radio({
  fontStyle,
  fontSize,
  fontColor,
  directionRender,
  options,
  value,
  handleChange,
  handleChangeOption,
  name,
  size,
  config,
  ...rest
}) {
  const renderIcon = (checked, _size) => {
    if (checked) {
      return (
        <IconColor size={_size}>
          <IconColorDot size={_size} />
        </IconColor>
      );
    }
    return <IconGray size={_size} />;
  };

  return (
    <Container key={name + '_radio'} directionRender={directionRender}>
      {options.map((opt, index) => (
        <Fragment key={index + '_fragment'}>
          <ContainerOption key={index} directionRender={directionRender}>
            <TouchableOpacity onPress={() => handleChange(opt.value)}>
              {renderIcon(opt.value === value)}
            </TouchableOpacity>
            <Label
              fontStyle={fontStyle}
              directionRender={directionRender}
              fontSize={fontSize}
              fontColor={fontColor}>
              {opt.label}
            </Label>
          </ContainerOption>
          {opt.subOptions &&
            opt.subOptions.options &&
            opt.value === value &&
            opt.subOptions.options.map((op, _index) => (
              <ContainerOptionItem key={_index}>
                <Label
                  fontStyle={'italic'}
                  fontSize={fontSize - 2}
                  fontColor={colors.TEXT_GRAY}>
                  {op.label}
                </Label>
                <TouchableOpacity
                  onPress={() =>
                    config.handleChange(opt.subOptions.name)(op.value)
                  }>
                  {renderIcon(
                    op.value === config.values[opt.subOptions.name],
                    'mini',
                  )}
                </TouchableOpacity>
              </ContainerOptionItem>
            ))}
        </Fragment>
      ))}
    </Container>
  );
}
