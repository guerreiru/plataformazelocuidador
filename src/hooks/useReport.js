import React, { useState } from 'react';
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

import ModalReport from '../components/Modal/ModalReport';
import ModalViewPDF from '../components/Modal/ModalViewPDF';
import api from '../services/api';

export default () => {
  const [confirm, setConfirm] = useState(null);
  const [confirmViewPDF, setConfirmViewPDF] = useState(null);

  async function saveFile(data) {
    try {
      const timestamp = new Date().getTime();
      const fileUri = `${FileSystem.cacheDirectory}report_${timestamp}.pdf`;
      await FileSystem.writeAsStringAsync(
        fileUri,
        `${data}`, // Base64
        { encoding: FileSystem.EncodingType.Base64 },
      );
      const UTI = 'public.item';
      await Sharing.shareAsync(fileUri, { UTI });
      FileSystem.deleteAsync(fileUri);
      return { status: true };
    } catch (error) {
      return { status: false };
    }
  }

  const setUseModal = () => {
    setConfirm(true);
  };

  const renderModal = (title, base64) => {
    if (confirm) {
      return (
        <ModalReport
          title={title}
          visible={confirm}
          onClose={() => setConfirm(false)}
          onPressToView={() => {
            setConfirm(false);
            setTimeout(() => {
              setConfirmViewPDF(true);
            }, 500);
          }}
          onPressSave={async () => {
            let granted;
            if (Platform.OS === 'android') {
              granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              );
            } else {
              granted = true;
            }
            if (granted) {
              try {
                await saveFile(base64);
                Alert.alert('Sucesso', 'Relatório Salvo com sucesso');
              } catch (erro) {
                Alert.alert('Error', 'Não foi possível salvar o relatório');
              }
            }
            setConfirm(false);
          }}
        />
      );
    }
  };

  const renderModalViewPDF = (base64) => {
    if (confirmViewPDF) {
      return (
        <ModalViewPDF
          visible={confirmViewPDF}
          base64={base64}
          saveFile={saveFile}
          onCancel={() => {
            setConfirmViewPDF(false);
            setConfirm(false);
          }}
        />
      );
    }
  };

  const getReportGeneral = async (senior_id) => {
    const date = new Date();
    const GMT = date.getTimezoneOffset() / -60;
    const response = await api.get(
      `/seniors/${senior_id}/caregiver/general-report`,
      { GMT },
    );
    return response;
  };

  return { setUseModal, renderModal, getReportGeneral, renderModalViewPDF };
};
