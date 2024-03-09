import { getApiKey, setApiKey } from '../lib/apiKey.js';

describe('getApiKey', () => {

  it('deve retornar o valor da chave API', () => {
    const apiKey = 'chave-api';
    localStorage.setItem('apiKeyChatGPT', apiKey);
    expect(getApiKey()).toBe(apiKey);
  });

  it('deve retornar null se a chave API não estiver definida', () => {
    localStorage.removeItem('apiKeyChatGPT');
    expect(getApiKey()).toBeNull();
  });
});

describe('setApiKey', () => {

  it('deve definir a chave API corretamente', () => {
    const apiKey = 'testandoNovaKey';
    setApiKey(apiKey);
    expect(localStorage.getItem('apiKeyChatGPT')).toBe(apiKey);
  });
});
