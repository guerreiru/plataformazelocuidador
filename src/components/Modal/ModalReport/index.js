import React from 'react';
import Button from '../../Buttons/Button';

import {
  View,
  Card,
  Header,
  Container,
  ContainerImag,
  ContainerButton,
  ContainerText,
  CenteredText,
  ImgInfo,
} from './styles';
import ImgInfoUrl from '../../../Images/info.png';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks';
import { Text } from 'react-native';

const ModalReport = ({
  title,
  mode = 'fade',
  visible,
  setVisible = () => {},
  onPressToView = () => {
    return false;
  },
  onPressSave = () => {
    return false;
  },
  onClose = () => false,
}) => {
  const {user} = useAuth();  
  const navigation = useNavigation();

  if(!user?.cpf)
  return (
    <SafeAreaView>
      <View animationType={mode} transparent={true} visible={visible}>
        <Container>
          <Card>
            <ContainerImag>
              <Header>
                Cadastro Imcompleto!
              </Header>
              <ContainerText>
                <CenteredText>Preencha os dados abaixo para baixar o relatório:</CenteredText>
              <Text style={{minWidth: "80%"}}>
              <ImgInfo source={ImgInfoUrl} resizeMode="contain" />
              CPF</Text>
              </ContainerText>
            </ContainerImag>
            
            <ContainerButton>
            <Button label={'Preencher Dados'} onPress={() => {
              setVisible(false);
              navigation.navigate("ProfessionalEditProfile");
            }}/>
            </ContainerButton>

            <ContainerButton>
              <Button label={'Fechar'} toInvertColors onPress={() => {
                setVisible(false);
              }}/>
            </ContainerButton>
          </Card>
        </Container>
      </View>
    </SafeAreaView>
  )

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
              <ContainerText>
                <CenteredText>O documento PDF possui uma senha para proteção dos dados.</CenteredText>
                <CenteredText>Utilize os 6 primeiros dígitos do seu CPF para abrir.</CenteredText>
              </ContainerText>
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
