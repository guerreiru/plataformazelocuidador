import React from 'react';
import Button from '../Buttons/Button';
import { Container, Description, Imag } from './styles';

const NoInformation = ({
  description,
  buttonLabel = null,
  onPress,
  imag = null,
  fullPage = true,
  fontColor,
}) => {
  const renderImag = () => (imag ? <Imag source={imag} /> : null);
  const renderButton = () =>
    buttonLabel ? <Button label={buttonLabel} onPress={onPress} /> : null;

  return (
    <Container fullPage={fullPage}>
      {renderImag()}
      <Description fontColor={fontColor}>{description}</Description>
      {renderButton()}
    </Container>
  );
};

export default NoInformation;
