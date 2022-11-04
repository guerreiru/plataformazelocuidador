import React from 'react';
import colors from '../../styles/colors';
import {
  Container,
  SubContainer,
  ContainerDescription,
  Title,
  Description,
  SubDescription,
  Icon,
} from './styles';

const styleIcon = {
  marginTop: 20,
  marginLeft: 20,
  marginRight: 25,
  marginBottom: 20,
};

export default function Item({
  title,
  description,
  subDescription,
  iconLeft = null,
  iconRight = null,
  IconLib = null,
  onPress,
}) {
  const renderSubDescription = () =>
    subDescription ? <SubDescription> {subDescription} </SubDescription> : null;

  const renderIcon = () =>
    IconLib ? (
      <IconLib
        name={iconLeft}
        size={22}
        color={colors.PRIMARY}
        style={styleIcon}
      />
    ) : (
      <Icon name={iconLeft} />
    );

  const renderIconRight = () => (iconRight ? <Icon name={iconRight} /> : null);

  return (
    <Container onPress={onPress}>
      <SubContainer>
        {renderIcon()}

        <ContainerDescription>
          <Title>{title}</Title>
          <Description>{description}</Description>
          {renderSubDescription()}
        </ContainerDescription>
        {renderIconRight()}
      </SubContainer>
    </Container>
  );
}
