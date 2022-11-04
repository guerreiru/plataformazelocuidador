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
} from './styles';
import Button from 'components/Buttons/Button';
import useTerms from 'hooks/useTerms';
import useAuth from 'hooks/useAuth';
import ButtonLeaked from 'components/Buttons/ButtonLeaked';

const Terms = ({ route, navigation, children, setTermId = () => {} }) => {
  const params = route.params;
  const { navigate } = navigation;
  const { getTerms, declineTerms, getExtraTerms } = useTerms();
  const { logout } = useAuth();
  const [terms, setTerms] = useState('');
  const [id, setId] = useState(null);
  const [extraTerms, setExtraTerms] = useState(false);

  const initialize = async () => {
    const _terms = await getTerms();
    const _extraTerms = await getExtraTerms();
    setExtraTerms(_extraTerms?.id ? true : false);
    setTerms(_terms.description);
    setTermId(_terms.id);
    setId(_terms.id);
  };

  useEffect(() => {
    initialize();
  }, []);

  const decline = async () => {
    await declineTerms(id);
    await logout();
  };

  if (params && params.showAccept) {
    return (
      <PageAccept>
        <Background>{renderText()}</Background>
        <ContainerButton>
          <Button
            onPress={() => navigate('SignUpPersonalData', { accept: true })}
            label="ACEITAR"
          />
        </ContainerButton>
      </PageAccept>
    );
  }

  return <Page>{renderText()}</Page>;

  function formatText() {
    if (terms) {
      const termsArray = terms
        .replace(/[\r]?\n[\r]?\n/, '')
        .split('\n')
        .map((line, idx) => {
          const res = line.match(/\[title\](.*)\[\/title\]/);
          if (res) {
            return <Title key={`line-${idx}`}>{res[1]}</Title>;
          }
          return <TextTerm key={`line-${idx}`}>{line.trim()}</TextTerm>;
        });
      return termsArray;
    }
    return null;
  }

  function renderText() {
    return (
      <>
        {formatText()}
        <TextTerm>{'\n'}</TextTerm>
        <Hyperlink
          onPress={() =>
            Linking.openURL(
              'https://zelo.lariisasaudedigital.com/termos-de-uso/',
            )
          }>
          Termos de Uso
        </Hyperlink>
        <Hyperlink
          onPress={() =>
            Linking.openURL(
              'https://zelo.lariisasaudedigital.com/politicas-de-privacidade/',
            )
          }>
          Política de Privacidade
        </Hyperlink>
        {children ? (
          children
        ) : (
          <>
            <ButtonLeaked
              onPress={decline}
              fullWidth={true}
              label="Retirar aceite aos termos de uso"
            />
            {extraTerms && (
              <ButtonLeaked
                onPress={() => navigate('TermsExtra')}
                fullWidth={true}
                label="Ir para termos Cuidador/Familiar"
              />
            )}
          </>
        )}
        <TextTerm>{'\n'}</TextTerm>
      </>
    );
  }
};

export default Terms;
