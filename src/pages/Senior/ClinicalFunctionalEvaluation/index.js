import React, { useState, useEffect } from 'react';
import {
  useNavigation,
  useIsFocused,
  StackActions,
} from '@react-navigation/native';

import ImgNoClinicalFunctionalEvaluation from 'Images/ClinicalFunctionalEvaluation.png';
import NoInformation from 'components/NoInformation';
import CardCollapse from 'components/CardCollapse';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import Page from 'components/Page';

import {
  formatKatzToSumary,
  formatProblemsToSumary,
  formatNoteProblemsToSumary,
  formatDiseasesToSumary,
  formatNoteDiseasesToSumary,
} from 'utils/objectFormatters';

import { Container, Label, Subtitle, Title } from './styles';

const ClinicalFunctionalEvaluation = () => {
  const { senior, getEvalutionClinicalAndFunctional } = useSenior();
  const [evolution, setEvolution] = useState(null);
  const [katz, setKatz] = useState([]);
  const [problems, setProblems] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [noteDiseases, setNoteDiseases] = useState([]);
  const [noteProblems, setNoteProblems] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getTheTreathment = (gender) =>
    gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.';

  const getEvolution = async () => {
    const _noteProblems = formatNoteProblemsToSumary(_evolution);
    const _noteDiseases = formatNoteDiseasesToSumary(_evolution);
    const _evolution = await getEvalutionClinicalAndFunctional(senior.id);
    const _diseases = formatDiseasesToSumary(_evolution);
    const _problems = formatProblemsToSumary(_evolution);
    const _katz = formatKatzToSumary(_evolution);

    setNoteProblems(_noteProblems);
    setNoteDiseases(_noteDiseases);
    setEvolution(_evolution);
    setDiseases(_diseases);
    setProblems(_problems);
    setKatz(_katz);

    if (
      _katz.length > 0 ||
      _problems.length > 0 ||
      noteProblems.length > 0 ||
      _diseases.length > 0 ||
      noteDiseases.length > 0
    ) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (isFocused) {
      getEvolution();
    }
  }, [isFocused]);

  if (!evolution) {
    return null;
  }

  const _renderContent = (content, notes = []) => {
    return (
      <Container padding={20}>
        {content.length > 0 ? (
          <>
            {content.map((item, index) => (
              <Label key={index}>{item.name}</Label>
            ))}
            {notes.length > 0 && (
              <>
                <Subtitle>OBSERVAÇÕES: </Subtitle>
                {notes.map((note, index) => (
                  <Label key={index}>{note.name}</Label>
                ))}
              </>
            )}
          </>
        ) : (
          <Label>{`Não há informação registrada.`}</Label>
        )}
      </Container>
    );
  };

  const render = () =>
    isVisible ? (
      <Page hasSidePadding={16}>
        <Title>
          Confira as condições que requerem maior atenção no cuidado{' '}
          {getTheTreathment(senior.gender)} {senior.full_name}.
        </Title>
        <CardCollapse title="Dependências">{_renderContent(katz)}</CardCollapse>
        <CardCollapse title="Problemas">
          {_renderContent(problems, noteProblems)}
        </CardCollapse>
        <CardCollapse title="Doenças">
          {_renderContent(diseases, noteDiseases)}
        </CardCollapse>
      </Page>
    ) : (
      <NoInformation
        imag={ImgNoClinicalFunctionalEvaluation}
        buttonLabel={'FALAR COM PROFISSIONAL DE SAÚDE'}
        description={`Ops... ${senior.gender === 'MASCULINO' ? '0' : 'A'} ${
          THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]
        }${
          senior.full_name
        } ainda não recebeu uma avaliação clínico-funcional.`}
        onPress={() => {
          const popToTopAction = StackActions.pop(2);
          Promise.all([navigation.dispatch(popToTopAction)]).then(() =>
            navigation.navigate('Teams', { screen: 'HealthProfessionals' }),
          );
        }}
      />
    );

  return render();
};

export default ClinicalFunctionalEvaluation;
