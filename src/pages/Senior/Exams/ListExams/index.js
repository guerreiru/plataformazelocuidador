import React, { useState } from 'react';
import Page from 'components/Page';
import {
  CardExam,
  CardContent,
  CardIcon,
  CardBody,
  Title,
  Text,
  CardFooter,
  Icon,
  SmallIcon,
  Row,
  IconFooter,
  ShowResult,
  NoExamRequested,
  ButtonDownloadResult,
  ButtonText,
} from './styles';
import useReport from 'hooks/useReport';
import useExam from 'hooks/useExam';
import useSenior from 'hooks/useSenior';
import { formatDate } from '../../../../utils/date';
import { formatProfissionAndFullName } from '../../../../utils/formatProfessional';

const ListExams = ({ exams }) => {
  const { senior } = useSenior();
  const [reportBase64, setReportBase64] = useState(null);
  const { setUseModal, renderModal, renderModalViewPDF } = useReport();
  const { getExamPDF } = useExam();

  const handleExamPDF = async (examId) => {
    const res = await getExamPDF(examId);

    const { base64 } = res;
    if (base64) {
      setReportBase64(base64);
      setUseModal(true);
    }
    return res;
  };

  const renderStatusIcon = (status) => {
    const iconColor = status !== 'FINISHED' ? '#9FB3C9' : '#27BB86';
    const iconName = status !== 'FINISHED' ? 'watch-later' : 'check-circle';
    return (
      <CardIcon>
        <Icon name="description" size={32} />
        <SmallIcon name={iconName} color={iconColor} />
      </CardIcon>
    );
  };

  const renderProfessional = (profession, name) => (
    <Text>{formatProfissionAndFullName(profession, name)}</Text>
  );

  const renderCardFooter = (exam) => {
    if (exam.status === 'FINISHED') {
      return (
        <CardFooter>
          {exam.show_result ? (
            <ButtonDownloadResult onPress={() => handleExamPDF(exam.exam_id)}>
              <Icon name="file-download" size={16} color="#ffffff" />
              <ButtonText>Baixar Resultado</ButtonText>
            </ButtonDownloadResult>
          ) : (
            <ShowResult>
              <IconFooter name="medical-services" />
              <Text fontSize={12} color="#527253">
                Resultado Disponível para a Equipe de Saúde
              </Text>
            </ShowResult>
          )}
        </CardFooter>
      );
    } else {
      return null;
    }
  };

  if (!exams.length) {
    return (
      <NoExamRequested>
        <Icon name="watch-later" size={32} color="#9FB3C9" />
        <Title color="#527253" style={{ marginTop: 8, textAlign: 'center' }}>
          Nenhum exame solicitado {'\n'} pela Equipe de Saúde
        </Title>
      </NoExamRequested>
    );
  }
  return (
    <Page hasSidePadding>
      {exams.map((exam) => (
        <CardExam key={exam.id}>
          <CardContent>
            {renderStatusIcon(exam.status)}
            <CardBody>
              <Title>{exam.commercial_name || exam.name}</Title>
              <Row mb={2}>
                <Text bold>Nº do Exame: </Text>
                <Text>{exam.exam_id}</Text>
              </Row>

              <Row mb={2}>
                <Text bold>Solicitado em: </Text>
                <Text>{formatDate(exam.date)}</Text>
              </Row>
              <Row mb={2}>
                <Text bold>Solicitado por: </Text>
                <Text>
                  {renderProfessional(
                    exam.professional_profession,
                    exam.professional_name,
                  )}
                </Text>
              </Row>
            </CardBody>
          </CardContent>

          {renderCardFooter(exam)}

          {renderModal('Resultado do Exame', reportBase64)}
          {renderModalViewPDF(reportBase64, senior.id)}
        </CardExam>
      ))}
    </Page>
  );
};

export default ListExams;
