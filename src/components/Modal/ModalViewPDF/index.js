import React from 'react';
import PDFReader from 'rn-pdf-reader-js';
import { Modal, View, TouchableOpacity, TextClose } from './styles';

const ModalViewPDF = ({
  visible,
  base64,
  seniorId,
  saveFile = () => {},
  onCancel = () => {
    return false;
  },
}) => {
  return (
    <Modal animationType="fade" transparent={false} visible={visible}>
      <View>
        <TouchableOpacity onPress={onCancel}>
          <TextClose> FECHAR</TextClose>
        </TouchableOpacity>
        <PDFReader
          source={{ base64: 'data:application/pdf;base64,' + base64 }}
        />
        <TouchableOpacity onPress={() => saveFile(base64)}>
          <TextClose> SALVAR/COMPARTILHAR</TextClose>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default ModalViewPDF;
