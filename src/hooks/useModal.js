import React, { useState } from 'react';
import Modal from '../components/Modal';

export default function useModal() {
  const [confirm, setConfirm] = useState(null);

  const setUseModal = () => {
    setConfirm(true);
  };

  const renderUseModal = ({
    title,
    message,
    textButtonDefault = 'OK',
    onPress = () => {},
  }) => {
    if (!confirm) {
      return null;
    }

    return (
      <Modal
        title={title}
        message={message}
        visible={confirm}
        textButtonDefault={textButtonDefault}
        handleChange={() => {
          setConfirm(false);
          onPress();
        }}
      />
    );
  };

  return {
    renderUseModal,
    setUseModal,
  };
}
