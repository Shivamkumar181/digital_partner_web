const getApiUrl = () => {
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://digital-partner-backend.onrender.com'; 
  }
};

export const API_URL = getApiUrl();
