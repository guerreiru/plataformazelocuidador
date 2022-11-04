import { useState } from 'react';
import api from '../services/api';

export default () => {
  const [warnings, setWarnings] = useState([]);

  const getWarnings = async () => {
    const _warnings = await api.get(`/caregivers/alerts`);
    setWarnings(_warnings);
    return _warnings;
  };

  const setRead = async (id) => {
    const response = await api.put(`/caregivers/alerts/${id}/mark-as-read`);
    return response;
  };

  return {
    getWarnings,
    setRead,
    warnings,
  };
};
