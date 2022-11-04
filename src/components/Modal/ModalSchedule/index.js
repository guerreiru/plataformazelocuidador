import React from 'react';
import ButtonLink from '../../Buttons/ButtonLink';
import { View, Card, Header, Message, Content, Container } from '../styles';

import {
  CardCenter,
  ContainerButton,
  Info,
  TextInputMask,
  InputContainer,
  InputBox,
  Separator,
} from './styles';

const ModalSchedule = ({
  onPressConfirm,
  hours,
  minutes,
  setHours,
  setMinutes,
  mode = 'fade',
  title,
  message,
  visible,
  handleChange,
}) => {
  const renderInput = (value, setValue, maximumValue, mask) => {
    return (
      <InputBox>
        <TextInputMask
          type={'datetime'}
          value={value}
          onChangeText={(val) => {
            if (val >= 0 && val <= maximumValue) {
              setValue(val);
            } else {
              setValue('00');
            }
          }}
          options={{
            mask: mask,
          }}
        />
      </InputBox>
    );
  };

  return (
    <View animationType={mode} transparent={true} visible={visible}>
      <Container>
        <Card>
          <Content>
            <Header>{title}</Header>
            <Message>{message}</Message>
            <CardCenter>
              <InputContainer>
                {renderInput(hours, setHours, 23, 'HH')}
                <Separator>:</Separator>
                {renderInput(minutes, setMinutes, 59, 'mm')}
              </InputContainer>
            </CardCenter>
            <CardCenter>
              <Info>{`os horários das próximas doses\nserão definidos automaticamente`}</Info>
            </CardCenter>
          </Content>
          <ContainerButton>
            <ButtonLink
              label={'CONFIRMAR HORÁRIO'}
              onPress={() => {
                onPressConfirm();
              }}
            />

            <ButtonLink label={'CANCELAR'} onPress={() => handleChange()} />
          </ContainerButton>
        </Card>
      </Container>
    </View>
  );
};

export default ModalSchedule;
