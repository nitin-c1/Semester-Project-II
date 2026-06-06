const API_BASE_URL = 'http://localhost:5000/api';

export const checkUrlApi = async (url) => {
  const response = await fetch(`${API_BASE_URL}/check-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export const analyzeUrlAiApi = async (url) => {
  const response = await fetch(`${API_BASE_URL}/analyze-ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
