import React, { useState } from 'react';
import InputContainer from '../InputContainer';
import { ActionButton, TextInput } from './styles';

export default function Input({
  name,
  value,
  handleChange,
  label,
  type,
  mask,
  error,
  setFieldTouched,
  editable,
  placeholder = '',
  preHandleChange,
  setRef,
  ...rest
}) {
  const [focused, setFocused] = useState(false);
  const [secret, setSecret] = useState(type === 'password');
  const setActionButton = () => {
    if (type === 'password') {
      return {
        icon: () => {
          if (secret) {
            return <ActionButton name="visibility" />;
          }
          return <ActionButton name="visibility-off" />;
        },
        onPress: () => {
          setSecret(!secret);
        },
      };
    }
  };
  return (
    <InputContainer
      label={label}
      error={error}
      focused={focused}
      editable={editable}
      actionButton={setActionButton()}>
      <TextInput
        {...rest}
        onFocus={() => {
          setFocused(true);
          setFieldTouched();
        }}
        onBlur={() => setFocused(false)}
        keyboardAppearance="dark"
        value={value}
        onChangeText={(val) => {
          if (preHandleChange) {
            const _val = preHandleChange(val);
            handleChange(_val);
          } else {
            handleChange(val);
          }
        }}
        placeholder={placeholder}
        secureTextEntry={secret}
        editable={editable}
        ref={(ref) => setRef && setRef(ref)}
      />
    </InputContainer>
  );
}
