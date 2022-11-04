import React from 'react';
import colors from '../../../styles/colors';
import {
  ButtonSpace,
  Container,
  ErrorTxt,
  IconError,
  IconSpace,
  InputBox,
  Label,
} from './styles';

export default function InputContainer({
  editable,
  children,
  label,
  error,
  focused,
  actionButton = null,
}) {
  const renderError = () => (error ? <ErrorTxt>{error}</ErrorTxt> : null);

  const renderIcon = () => {
    if (error) {
      return (
        <IconSpace>
          <IconError name="error" color={colors.ERROR} />
        </IconSpace>
      );
    }
    if (actionButton) {
      return (
        <ButtonSpace onPress={actionButton.onPress}>
          <actionButton.icon />
        </ButtonSpace>
      );
    }
  };

  return (
    <Container>
      <Label>{label}</Label>
      <InputBox focused={focused} hasError={!!error} editable={editable}>
        {children}
        {renderIcon()}
      </InputBox>
      {renderError()}
    </Container>
  );
}
