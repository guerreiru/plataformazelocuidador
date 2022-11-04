import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';

import {
  Title,
  TextTerm,
  Background,
  Page,
  PageAccept,
  ContainerButton,
  Hyperlink,
  Strong,
} from './styles';
import Button from 'components/Buttons/Button';
import useTerms from 'hooks/useTerms';
import useAuth from 'hooks/useAuth';
import ButtonLeaked from 'components/Buttons/ButtonLeaked';
import Checkbox from 'components/Checkbox';

const TermsExtra = ({
  route,
  navigation,
  children,
  getDisabled = () => {},
  setTermId = () => {},
}) => {
  const params = route.params;
  const { navigate } = navigation;
  const { declineExtraTerms, getExtraTerms } = useTerms();
  const { logout } = useAuth();
  const [terms, setTerms] = useState('');
  const [values, setValues] = useState({});
  const [id, setId] = useState(null);
  const [count, setCount] = useState(0);

  const initialize = async () => {
    const _terms = await getExtraTerms();
    if (_terms) {
      const new_terms = _terms.description
        .replace(/[\r]?\n[\r]?\n/, '')
        .split('\n');
      setTerms(new_terms);
      setTermId(_terms.id);
      setId(_terms.id);
      setCount(
        new_terms.filter((t) => !!t.match(/\[option\](.*)\[\/option\]/)).length,
      );
    }
  };

  const setValuesTerms = (key, value) => {
    const _values = { ...values };
    _values[key] = JSON.parse(value);
    setValues(_values);
  };

  useEffect(() => {
    initialize();
  }, []);

  const isAllChecked = () => {
    const results = Object.values(values);
    if (results.length === 0) {
      return false;
    }

    return results.filter((r) => r).length === count;
  };

  useEffect(() => {
    const isDisabled = !isAllChecked();
    getDisabled(isDisabled);
  }, [values]);

  const decline = async () => {
    await declineExtraTerms(id);
    await logout();
  };

  const formatText = () => {
    if (terms) {
      return terms.map((line, idx) => {
        const res = line.match(/\[title\](.*)\[\/title\]/);
        const strong = line.match(/\[strong\](.*)\[\/strong\]/);
        const option = line.match(/\[option\](.*)\[\/option\]/);

        if (res) {
          return <Title key={`line-${idx}`}>{res[1]}</Title>;
        }
        if (strong) {
          return <Strong key={`line-${idx}`}>{strong[1]}</Strong>;
        }
        if (option) {
          return (
            <Checkbox
              key={`terms-${idx}`}
              name={`terms-${idx}`}
              label={option[1]}
              value={children ? `${values[`terms-${idx}`]}` : true}
              handleChange={(value) => setValuesTerms(`terms-${idx}`, value)}
            />
          );
        }
        return <TextTerm key={`line-${idx}`}>{line.trim()}</TextTerm>;
      });
    }
    return null;
  };

  if (params && params.showAccept) {
    return (
      <PageAccept>
        <Background>{renderText()}</Background>
        <ContainerButton>
          <Button
            disabled={!isAllChecked()}
            onPress={() => navigate('SignUpPersonalData', { accept: true })}
            label="ACEITAR"
          />
        </ContainerButton>
      </PageAccept>
    );
  }

  return <Page>{renderText()}</Page>;

  function renderText() {
    return (
      <>
        {formatText(values)}
        <Hyperlink
          onPress={() =>
            Linking.openURL('https://zelo.lariisasaudedigital.com/')
          }>
          zelo.lariisasaudedigital.com
        </Hyperlink>
        <TextTerm>{'\n'}</TextTerm>
        {children ? (
          children
        ) : (
          <ButtonLeaked
            onPress={decline}
            fullWidth={true}
            label="Retirar aceite aos termos de uso"
          />
        )}
        <TextTerm>{'\n'}</TextTerm>
      </>
    );
  }
};

export default TermsExtra;
