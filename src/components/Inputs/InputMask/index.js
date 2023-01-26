import React, { useState } from 'react';
import InputContainer from '../InputContainer';
import { TextInputMask } from './styles';

export default function InputMask(props) {
  const {
    name,
    mask,
    maskCustom,
    label,
    placeholder,
    error,
    handleChange,
    value,
    editable,
    setFieldTouched = () => {},
    setRef,
    returnKeyType,
    onSubmitEditing,
    ...rest
  } = props;

  const [focused, setFocused] = useState(false);
  return (
    <InputContainer
      label={label}
      error={error}
      focused={focused}
      editable={editable}>
      <TextInputMask
        {...rest}
        onFocus={() => {
          setFieldTouched();
          setFocused(true);
        }}
        onBlur={() => setFocused(false)}
        type={mask}
        options={{ mask: maskCustom }}
        value={value}
        onChangeText={(val) => {
          handleChange(val);
        }}
        placeholder={placeholder}
        editable={editable}
        ref={(ref) => setRef && setRef(ref)}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </InputContainer>
  );
}
