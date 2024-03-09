import { communicateWithOpenAI } from '../lib/openAIApi.js';

/* eslint-disable */
global.fetch = jest.fn().mockResolvedValue({
  status: 200, json: jest.fn().mockResolvedValue({})
});

describe("communicateWithOpenAI", () => {
  test("A comunicação deve enviar uma solicitação para a API OpenAI e retornar os dados com sucesso!!!", async () => {
    const resposta = { choices: [{ message: { content: 'Esta é uma resposta' } }], ok: true };
    global.fetch.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(resposta) })
    const data = await communicateWithOpenAI("Esta é uma mensagem", {
      id: "1",
    });
    expect(typeof (data)).toEqual('object');
  });
  test("Deve retornar uma mensagem válida da API da OpenAI", async () => {
    const resposta = { choices: [{ message: { content: 'Esta é uma mensagem gerada pela API da OpenAI.' } }], ok: true };
    global.fetch.mockResolvedValue({ ok: true, json: jest.fn().mockResolvedValue(resposta) })
    const data = await communicateWithOpenAI("Esta é uma mensagem", {
      id: "1",
    });
    expect(data.content).toBe('Esta é uma mensagem gerada pela API da OpenAI.');
  });

  it('Deve tratar corretamente a falha na comunicação com a API', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });
    await expect(communicateWithOpenAI([])).rejects.toThrow('Failed to fetch');
  });

  it('Deve tratar corretamente o caso de nenhuma mensagem encontrada', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });
    await expect(communicateWithOpenAI([])).rejects.toThrow('No messages found');
  });
});

