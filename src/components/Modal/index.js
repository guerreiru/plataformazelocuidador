import React from 'react';

import {
  View,
  Card,
  Header,
  Footer,
  Message,
  Content,
  TextButton,
  Container,
  Button,
} from './styles';

const Modal = ({
  title,
  message,
  children,
  mode = 'fade',
  footer,
  visible,
  handleChange,
  textButtonDefault = 'OK',
}) => {
  return (
    <View animationType={mode} transparent={true} visible={visible}>
      <Container>
        <Card>
          <Content>
            <Header>{title}</Header>
            <Message>{message}</Message>
            {children}
          </Content>
          <Footer>
            {footer || (
              <Button onPress={() => handleChange(false)}>
                <TextButton>{textButtonDefault}</TextButton>
              </Button>
            )}
          </Footer>
        </Card>
      </Container>
    </View>
  );
};

export default Modal;
