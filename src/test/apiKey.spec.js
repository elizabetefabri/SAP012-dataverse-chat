import { getApiKey, setApiKey } from '../lib/apiKey.js';

describe('getApiKey', () => {

  it('deve retornar o valor da chave API', () => {
    // Defindo um valor para a chave API no Local Storage
    const apiKey = 'chave-api';
    localStorage.setItem('apiKeyChatGPT', apiKey);

    // Chamando a função getApiKey e verificando se ela retorna o valor correto
    expect(getApiKey()).toBe(apiKey);
  });

  it('deve retornar null se a chave API não estiver definida', () => {
    // Remova a chave API do Local Storage
    localStorage.removeItem('apiKeyChatGPT');

    // Chamando a função getApiKey e verifique se ela retorna null
    expect(getApiKey()).toBeNull();
  });
});

describe('setApiKey', () => {

  it('deve definir a chave API corretamente', () => {
    // Chame a função setApiKey para definir a chave API
    const apiKey = 'testandoNovaKey';
    setApiKey(apiKey);

    // Verificando se a chave API foi definida corretamente no Local Storage
    expect(localStorage.getItem('apiKeyChatGPT')).toBe(apiKey);
  });
});
