import React from 'react';
import Button from '../../Buttons/Button';

import {
  View,
  Card,
  Header,
  Container,
  ContainerImag,
  ContainerButton,
} from './styles';
import { SafeAreaView } from 'react-native';

const ModalReport = ({
  title,
  mode = 'fade',
  visible,
  onPressToView = () => {
    return false;
  },
  onPressSave = () => {
    return false;
  },
  onClose = () => false,
}) => {
  return (
    <SafeAreaView>
      <View animationType={mode} transparent={true} visible={visible}>
        <Container>
          <Card>
            <ContainerImag>
              <Header>
                {title}
                {`\nGerado!`}
              </Header>
            </ContainerImag>

            <ContainerButton>
              <Button label={'Visualizar'} onPress={onPressToView} />
            </ContainerButton>

            <ContainerButton>
              <Button label={'Salvar / Compartilhar'} onPress={onPressSave} />
            </ContainerButton>

            <Button label={'Fechar'} onPress={onClose} />
          </Card>
        </Container>
      </View>
    </SafeAreaView>
  );
};

export default ModalReport;
