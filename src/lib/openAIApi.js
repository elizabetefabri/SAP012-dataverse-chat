import { getApiKey } from './apiKey.js';

export const communicateWithOpenAI = async (messages) => {
  const url = 'https://api.openai.com/v1/chat/completions';
  const api_key = getApiKey();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages
      })
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return {
        success: true,
        content: data.choices[0].message.content,
      };
    } else {
      throw new Error('Nenhuma mensagem encontrada');
    }
  } catch (error) {
    // console.error(error);
    // throw error;
    throw new Error(error);
  }
};
