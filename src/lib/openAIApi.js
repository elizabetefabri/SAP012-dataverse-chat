import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = async (messages) => {
  const OPENAI_API_KEY = getApiKey();
  const url = 'https://api.openai.com/v1/chat/completions';
  const api = "Bearer " + OPENAI_API_KEY;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': api
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        // temperature: 0.7,
        messages
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message;
    } else {
      throw new Error('No messages found');
    }
  } catch (error) {
    throw new Error('Communication with OpenAI failed: ' + error.message);
  }
};
