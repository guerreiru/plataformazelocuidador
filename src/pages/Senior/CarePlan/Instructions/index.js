import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  Container,
  Title,
  Subtitle,
  Icon,
  ContainerDate,
  TitleDate,
  Divider,
  Content,
  Description,
  CardContent,
} from './styles';

import ImgNoIntructions from 'Images/Instructions.png';
import NoInformation from 'components/NoInformation';
import ReminderModal from 'components/ReminderModal';
import CardCollapse from 'components/CardCollapse';
import useCarePlan from 'hooks/useCarePlan';
import THE_SENIOR from 'utils/formatSenior';
import useSenior from 'hooks/useSenior';
import colors from 'styles/colors';
import Page from 'components/Page';

const Instructions = () => {
  const { senior } = useSenior();
  const { user } = useSelector((state) => state.auth);
  const { getCarePlans, instructions, clearCarePlans } = useCarePlan();

  useEffect(() => {
    getCarePlans(senior.id);
    return clearCarePlans;
  }, []);

  const renderInstructionsExtra = (item) => {
    if (item.extra_instruction && item.extra_instruction.length > 0) {
      return item.extra_instruction.map((i, k) => (
        <Description key={`extra_${k}`}>{i.description}</Description>
      ));
    }
  };

  const renderInstructionsStatus = (item) => {
    if (item.status_instruction && item.status_instruction.length > 0) {
      const alreadyExistsInstructions = item.status_instruction.some(
        (instruction) => instruction.status === true,
      );

      if (!alreadyExistsInstructions && item.extra_instruction.length === 0) {
        return (
          <Description key={`instruction_${new Date().toDateString()}`}>
            {'Nenhuma instrução cadastrada'}
          </Description>
        );
      }

      return item.status_instruction.map((instruction, k) => {
        if (instruction.status) {
          return (
            <Description key={`instruction_${k}`}>
              {instruction.instruction.description}
            </Description>
          );
        }
      });
    }
  };

  return (
    <>
      <ReminderModal />
      {instructions && instructions.length > 0 ? (
        <Page hasSidePadding={false}>
          <Container>
            <ContainerDate>
              <Icon name="calendar-blank" size={24} color={colors.PRIMARY} />
              <TitleDate>
                {format(new Date(), `EEEE',' d 'de' MMMM 'de' yyyy`, {
                  locale: pt,
                })}
              </TitleDate>
            </ContainerDate>
            <Title>Olá, {user.full_name}</Title>
            <Subtitle>
              {`Esta é a rotina de cuidados ${
                senior.gender === 'MASCULINO' ? 'do Sr.' : 'da Srª.'
              } ${senior.full_name} para hoje.`}
            </Subtitle>
          </Container>
          <Divider />
          <Content>
            {instructions.map((item, i) => {
              return (
                <CardCollapse title={item.action.description_caregiver} key={i}>
                  <CardContent>
                    {renderInstructionsStatus(item)}
                    {renderInstructionsExtra(item)}
                  </CardContent>
                </CardCollapse>
              );
            })}
          </Content>
        </Page>
      ) : (
        <NoInformation
          imag={ImgNoIntructions}
          description={`Ops... ${
            THE_SENIOR.THE_TREATMENT_PRONOUN[senior.gender.toUpperCase()]
          }${
            senior.full_name
          } ainda não possui uma rotina de cuidados. Aguarde que o(a) profissional de saúde realize a avaliação para visualizar a rotina.`}
        />
      )}
    </>
  );
};

export default Instructions;
