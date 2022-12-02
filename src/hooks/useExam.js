import api from '../services/api';

export default function useExam() {
  const getExamAvailable = async () => {
    const _exams = await api.get('/exam/available');
    return _exams;
  };

  const postScheduleExam = async (payload) => {
    const _return = await api.post('/exam/add', payload);
    return _return;
  };

  const getExamBySenior = async (payload) => {
    const _return = await api.get(`/exam/${payload}`);
    return _return;
  };

  const getExamPDF = async (payload) => {
    const _return = await api.get(`/exam/pdf/${payload}?mobile=true`);
    return _return;
  };

  const putExamUpdate = async (id, data) => {
    const _return = await api.put(`/exam/update/${id}`, data);
    return _return;
  };

  const deleteExam = async (payload) => {
    const _return = await api.delete(`/exam/delete/${payload}`);
    return _return;
  };

  return {
    getExamAvailable,
    postScheduleExam,
    getExamBySenior,
    getExamPDF,
    deleteExam,
    putExamUpdate,
  };
}
