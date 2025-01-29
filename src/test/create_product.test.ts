
// Importa a função que define a rota de criação de produtos
import { create_product } from "../routes/products/create-products.route";

// Importa a instância do Prisma para interagir com o banco de dados
import { prisma } from "../service/prisma";

// ========================
// 🔹 MOCK DO PRISMA 🔹
// ========================
// Como estamos fazendo um teste unitário, não queremos realmente interagir com o banco de dados.
// Por isso, criamos um "mock" (simulação) do Prisma para evitar chamadas reais ao banco.

jest.mock("../service/prisma", () => ({
  prisma: {
    produtos: {
      // Simula a função `create` do Prisma
      create: jest.fn(),
    },
  },
}));
// ========================
// 🔹 INÍCIO DOS TESTES 🔹
// ========================

describe("create_product - Teste Unitário", () => {
   // Variável para armazenar um mock do Fastify
  let appMock: any;

  beforeEach(() => {
    appMock = {
      post: jest.fn((route, handler) => {
        // Simula a chamada ao handler da rota
        appMock.handler = handler;
      }),
    };

    // Registra a rota no mock do Fastify
    create_product(appMock);
  });
  // ========================
  // 🔹 TESTE: Criar produto com sucesso 🔹
  // ========================

  it("deve criar um produto com sucesso", async () => {
     // Simulação de uma requisição HTTP com dados válidos
    const req = {
      body: {
        nome: "Produto Teste",
        descricao: "Descrição do produto",
        preco: "10.0",
      },
    };
     // Simulação de um objeto de resposta HTTP
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Simulando um ID retornado pelo banco
    (prisma.produtos.create as jest.Mock).mockResolvedValue({
      id: "123",
      ...req.body,
    });

    // Chama a função da rota simulada
    await appMock.handler(req, res);

    // Verifica se a função do Prisma foi chamada corretamente
    expect(prisma.produtos.create).toHaveBeenCalledWith({
      data: req.body,
    });
   // Verifica se a resposta retornou o status correto (200 - Sucesso)

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "123",
        nome: "Produto Teste",
        descricao: "Descrição do produto",
        preco: "10.0",
      })
    );
  });
    // ========================
  // 🔹 TESTE: Falha ao criar produto sem descrição 🔹
  // ========================

  it("deve retornar erro se a descrição não for enviada", async () => {
    const req = {
      body: {
        nome: "Produto Teste",
        preco: "10.0",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await appMock.handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ menssage: "descrition is required" });
  });
    // ========================
  // 🔹 TESTE: Falha ao criar produto sem nome 🔹
  // ========================
  it("deve retornar erro se o nome não for enviado", async () => {
    const req = {
      body: {
        descricao: "Descrição do produto",
        preco: "10.0",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await appMock.handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ menssage: "Name is required" });
  });

  // ========================  // ========================
  // 🔹 TESTE: Falha ao criar produto por erro no banco 🔹
  // ========================

  it("deve retornar erro se o banco de dados falhar", async () => {
    const req = {
      body: {
        nome: "Produto Teste",
        descricao: "Descrição do produto",
        preco: "10.0",
      },
    };

    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    // Simular erro no banco de dados
    (prisma.produtos.create as jest.Mock).mockRejectedValue(new Error("DB Error"));

    await appMock.handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      menssage: "server not responding, try again later",
    });
  });
});


