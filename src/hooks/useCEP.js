import api from '../services/api';

export default () => ({
  getCEP: async (cep) => {
    const response = await api.get(`/cep/${cep}`);
    return response;
  },
});
