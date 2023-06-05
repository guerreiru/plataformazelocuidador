import React, { useState } from 'react';
import PDFReader from 'rn-pdf-reader-js-with-password';
// import PDFReader from 'rn-pdf-reader-js';
import { View, TouchableOpacity, TextClose, Footer, TextButton, PassTextInput, Modal as ReactModal } from './styles';
import Modal from '..';

import { useSelector } from 'react-redux';
import { Button } from '../styles';
import colors from '../../../styles/colors';

const ModalViewPDF = ({
  visible,
  base64,
  seniorId,
  saveFile = () => {},
  onCancel = () => {
    return false;
  },
}) => {
  const { user } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');
  const [isCorrect, setIsCorrect] = useState(undefined);

  const handleSubmit = () => {
    if (user.cpf.replace('.', '').slice(0, 6) === password) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }

  if (isCorrect !== true) {
    return (
      <Modal
        visible={true}
        title='Senha do PDF:'
        message={isCorrect === undefined ? 'Insira a senha para visualizar o PDF' : 'Senha incorreta, tente novamente.'}
        footer={
          <Footer>
            <Button onPress={() => onCancel()}><TextButton color={colors.ERROR}>Cancelar</TextButton></Button>
            <Button onPress={() => handleSubmit()}><TextButton>Ok</TextButton></Button>
          </Footer>
        }
      >
        <PassTextInput
          onBlur={() => handleSubmit()}
          keyboardType='numeric'
          onChangeText={(txt) => { setPassword(txt);}}
          blurOnSubmit
        />
      </Modal>
    );
  }

  return (
    <ReactModal animationType="fade" transparent={false} visible={visible}>
      <View>
        <TouchableOpacity onPress={onCancel}>
          <TextClose> FECHAR</TextClose>
        </TouchableOpacity>
        <PDFReader
          source={{
            base64: 'data:application/pdf;base64,' + base64,
          }}
          password={password}
        />
        <TouchableOpacity onPress={() => saveFile(base64)}>
          <TextClose> SALVAR/COMPARTILHAR</TextClose>
        </TouchableOpacity>
      </View>
    </ReactModal>
  );
};

export default ModalViewPDF;
