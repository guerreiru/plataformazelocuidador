import React, { useState } from 'react';

import { Container, Title, Icon, Divider, Row, ContentFade } from './styles';

const CardCollapse = ({ title, children }) => {
  const [active, setActive] = useState(false);

  return (
    <Container onPress={() => setActive(!active)}>
      <Row>
        <Title>{title}</Title>
        <Icon size={24} name={active ? 'chevron-up' : 'chevron-down'} />
      </Row>
      <ContentFade active={active}>
        <Divider />
        {children}
      </ContentFade>
    </Container>
  );
};

export default CardCollapse;
