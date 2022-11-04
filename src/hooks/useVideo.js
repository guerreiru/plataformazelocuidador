import { useState, useEffect } from 'react';
import api from '../services/api';

export default function useVideo() {
  const [videos, setVideos] = useState([]);

  const initialize = async () => {
    const _response = await api.get(`/videos`);
    if (_response) {
      setVideos(_response);
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  return {
    videos,
  };
}
