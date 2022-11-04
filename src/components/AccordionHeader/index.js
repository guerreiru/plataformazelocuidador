import React from 'react';
import {
  Container,
  SubContainer,
  ContainerDescription,
  ContainerIcon,
  Title,
  Description,
  Icon,
  Arrows,
  IconError,
  IconAntDesign,
} from './styles';

import colors from '../../styles/colors';

export default function AccordionHeader({
  title,
  description,
  iconLetfAlternative = null,
  iconLeft = null,
  onPress,
  error,
  showBorders = false,
  paddingLeft,
  isActive,
}) {
  const renderIconError = () =>
    error ? <IconError name="error" color={colors.ERROR} /> : null;
  const renderIconLeft = () => {
    if (iconLetfAlternative) {
      return <IconAntDesign isActive={isActive} name={iconLetfAlternative} />;
    }

    if (iconLeft) {
      return <Icon isActive={isActive} name={iconLeft} />;
    }
    return null;
  };
  const renderDescription = () =>
    description ? <Description> {description} </Description> : null;

  return (
    <Container
      onPress={onPress}
      showBorders={showBorders}
      paddingLeft={paddingLeft}>
      <SubContainer>
        {renderIconLeft()}
        <ContainerDescription>
          <Title isActive={isActive}> {title} </Title>
          {renderDescription()}
        </ContainerDescription>
      </SubContainer>
      <ContainerIcon>
        {renderIconError()}
        <Arrows isActive name={isActive ? 'expand-less' : 'expand-more'} />
      </ContainerIcon>
    </Container>
  );
}
