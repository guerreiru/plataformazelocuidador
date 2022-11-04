import React, { useState } from 'react';
import {
  Overlay,
  Container,
  Label,
  PromptContainer,
  Prompt,
  PromptLabel,
  OptionContainer,
  OptionContainerInnerContainer,
  Option,
  OptionLabel,
  Cancel,
  CancelContainer,
  CancelLabel,
  SelectContainer,
  SelectLabel,
  Icon,
  ErrorTxt,
  IconError,
  Section,
  SectionLabel,
  Clear,
  ClearLabel,
} from './styles';
import { Modal, ScrollView, TouchableOpacity } from 'react-native';

export default function Select({
  options = [],
  error,
  focused,
  editable,
  promptLabel,
  label,
  handleChange,
  placeholder = 'Selecione uma opção',
  value,
  animationType = 'slide',
  transparent = true,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const close = () => setModalVisible(false);

  const open = () => setModalVisible(true);

  const renderError = () => (error ? <ErrorTxt>{error}</ErrorTxt> : null);

  const renderOption = (option) => {
    return (
      <TouchableOpacity
        key={option.label}
        onPress={() => {
          handleChange(option.value + '');
          close();
        }}>
        <Option>
          <OptionLabel>{option.label}</OptionLabel>
        </Option>
      </TouchableOpacity>
    );
  };

  const renderSection = (section) => {
    return (
      <Section key={section}>
        <SectionLabel>{section + ''}</SectionLabel>
      </Section>
    );
  };

  const renderOptionList = () => {
    const opts = options.map((item) => {
      if (item.section) {
        return renderSection(item.section);
      }
      return renderOption(item);
    });

    return (
      <Overlay>
        {promptLabel ? (
          <PromptContainer>
            <Prompt>
              <PromptLabel>{promptLabel + ''}</PromptLabel>
            </Prompt>
          </PromptContainer>
        ) : null}

        <OptionContainer>
          <ScrollView keyboardShouldPersistTaps="always">
            <OptionContainerInnerContainer>
              {opts}
            </OptionContainerInnerContainer>
          </ScrollView>
        </OptionContainer>

        <CancelContainer>
          <TouchableOpacity onPress={close}>
            <Cancel>
              <CancelLabel>Cancelar</CancelLabel>
            </Cancel>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              handleChange('null');
              close();
            }}>
            <Clear>
              <ClearLabel>Limpar</ClearLabel>
            </Clear>
          </TouchableOpacity>
        </CancelContainer>
      </Overlay>
    );
  };

  const renderChildren = () => {
    let selected = '';
    if (value !== null && value !== undefined) {
      const opt = options.filter((el) => el.value + '' === value + '');
      if (opt && opt.length > 0) {
        selected = opt.shift().label + '';
      }
    }

    return (
      <Container>
        <Label>{label}</Label>
        <SelectContainer hasError={error} focused={focused} editable={editable}>
          <SelectLabel>{selected || placeholder}</SelectLabel>
          {error ? <IconError name="error" /> : <Icon name="chevron-down" />}
        </SelectContainer>
        {renderError()}
      </Container>
    );
  };

  return (
    <>
      <Modal
        transparent={transparent}
        visible={modalVisible}
        onRequestClose={close}
        animationType={animationType}>
        {renderOptionList()}
      </Modal>
      <TouchableOpacity onPress={open}>{renderChildren()}</TouchableOpacity>
    </>
  );
}
