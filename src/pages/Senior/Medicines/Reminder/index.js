import React, { useState, useLayoutEffect } from 'react';
import moment from 'moment';

import { calcHours } from 'utils/date';
import { Button } from 'components/Modal/styles';
import useMedicines from 'hooks/useMedicines';
import TimePicker from 'components/TimePicker';
import InputMask from 'components/Inputs/InputMask';
import useSenior from 'hooks/useSenior';
import Modal from 'components/Modal';

import {
  Icon,
  TopButton,
  Title,
  ContainerTime,
  Label,
  Container,
  Text,
  ContainerDate,
  TxtButtonModal,
} from './styles';

const Reminder = ({ navigation, route }) => {
  const [date, setDate] = useState(moment().format('DD/MM/YYYY'));
  const [time, setTime] = useState('12:00');
  const [error, setError] = useState(null);

  const [confirmVisible, setConfirmVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [finishVisible, setFinishVisible] = useState(false);

  const { goBack, navigate } = navigation;
  const { senior } = useSenior();

  let sourceScreen;
  let medicine = {};
  if (route.params) {
    sourceScreen = route.params.sourceScreen;
    medicine = route.params.medicine;
  }

  const boldStyle = { fontWeight: 'bold' };

  const isNew = medicine ? !medicine.start_time : true;
  const { scheduleStartTime, scheduleUpdateTime, getMedicines } =
    useMedicines(senior);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNew ? 'Definir lembrete' : 'Alterar Lembrete',
      headerLeft: () => (
        <TopButton
          onPress={() => {
            goBack();
          }}>
          <Icon name={'close'} />
        </TopButton>
      ),
      headerRight: () => (
        <TopButton
          onPress={() => {
            if (!date) {
              setError('Informe a data de início.');
              return;
            }
            if (!error) {
              setConfirmVisible(true);
            }
          }}>
          <Icon name={'check'} />
        </TopButton>
      ),
    });
  }, [navigation, date, error]);

  const handleSubmit = async () => {
    if (!error) {
      const _date = `${date} ${time}`;
      const schedules = calcHours(
        `${date} ${time}`,
        medicine.administration_interval,
      );
      let res;
      if (isNew) {
        res = await scheduleStartTime(medicine.id, _date, schedules);
      } else {
        res = await scheduleUpdateTime(medicine.id, _date, schedules);
      }
      if (res) {
      }
      setFinishVisible(true);
    }
  };

  return (
    <Container>
      <Title>
        {`Informe quando será o 1º lembrete do medicamento ${medicine.name}.`}
      </Title>
      <ContainerDate>
        {!!isNew && (
          <InputMask
            label="Digite a data de início"
            placeholder="DD/MM/AAAA"
            name="dateInitial"
            value={date}
            error={error}
            mask={'datetime'}
            options={{
              format: 'DD/MM/YYYY',
            }}
            handleChange={(value) => {
              const _date = moment(value, 'DD/MM/YYYY');
              if (value.length < 10 || !_date.isValid()) {
                setError('Data inválida.');
              } else {
                setError(null);
              }
              setDate(value);
            }}
          />
        )}
      </ContainerDate>
      <ContainerTime>
        <Label>Selecione o horário de início</Label>
        <TimePicker minInc={1} onChange={(value) => setTime(value)} />
      </ContainerTime>
      <Text>
        Os horários dos próximos lembretes serão definidos automaticamente.
      </Text>
      <Modal
        title={
          isNew
            ? 'Confirmar horário do lembrete'
            : 'Confirmar alteração no horário'
        }
        message={
          <Text>
            Os horários das doses serão{'\n'}
            <Text style={boldStyle}>
              {calcHours(`${date} ${time}`, medicine.administration_interval)}
            </Text>
          </Text>
        }
        footer={
          <>
            <Button
              onPress={() => {
                setConfirmVisible(false);
                setCancelVisible(true);
              }}>
              <TxtButtonModal>CANCELAR</TxtButtonModal>
            </Button>
            <Button>
              <TxtButtonModal
                onPress={() => {
                  handleSubmit();
                  setConfirmVisible(false);
                }}>
                CONFIRMAR
              </TxtButtonModal>
            </Button>
          </>
        }
        visible={confirmVisible}
        handleChange={() => {}}
      />

      <Modal
        title="Alteração descartada"
        message={`Os horários das doses de ${medicine.name} não foram alterados.`}
        visible={cancelVisible}
        handleChange={() => {
          setCancelVisible(false);
          if (sourceScreen === 'CARE_PLAN') {
            navigate('CarePlan');
          } else {
            navigate('Medicines');
          }
        }}
      />

      <Modal
        title="Pronto!"
        message={`Os horários das doses de ${medicine.name} foram ${
          isNew ? 'alterados' : 'definidos'
        } com sucesso!`}
        visible={finishVisible}
        handleChange={() => {
          setFinishVisible(false);
          getMedicines();

          if (sourceScreen === 'CARE_PLAN') {
            navigate('CarePlan');
          } else {
            navigate('Medicines');
          }
        }}
      />
    </Container>
  );
};

export default Reminder;
