import Fastify from 'fastify';
import { create_product } from '../routes/products/create-products.route'; // Ajuste o caminho conforme necessário
import supertest from 'supertest';

describe('POST /create', () => {
  let app: any;

  beforeAll(async () => {
    // Cria a instância do Fastify
    app = Fastify();
    
    // Registra a rota para criar o produto
    app.register(create_product);

    // Inicia o servidor
    await app.listen({port:0}); // Isso vai permitir que o Fastify escolha uma porta disponível
  });
  // Fecha o servidor depois que os testes terminarem
  afterAll(async () => {
    await app.close(); 
  });

  it('deve criar um produto com sucesso', async () => {
    const response = await supertest(app.server) // Usa o server do Fastify
      .post('/create')
      .send({
        nome: 'Produto Teste',
        descricao: 'Descrição do produto',
        preco: "10.0",
      });
    expect(response.status).toBe(200);
     // Exemplo de como verificar o retorno
    expect(response.body).toHaveProperty('id');
  });

  it('deve retornar erro se o nome não for enviado', async () => {
    const response = await supertest(app.server)
      .post('/create')
      .send({
        descricao: 'Descrição do produto',
        preco: "10.0",
      });
    expect(response.status).toBe(404);
    expect(response.body.menssage).toBe('Name is required');
  });

  it('deve retornar erro se a descrição não for enviada', async () => {
    const response = await supertest(app.server)
      .post('/create')
      .send({
        nome: 'Produto Teste',
        preco: "10.0",
      });
    expect(response.status).toBe(404);
    expect(response.body.menssage).toBe('descrition is required');
  });
});
