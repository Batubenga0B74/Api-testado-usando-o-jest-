//importar as rotas que definee acraiação de rotas 
import {Create_employe } from "../routes/employee/create-employee.route"


//importar a instancia do prisma para interagir com a BD 
import {prisma} from "../service/prisma"
jest.mock("../service/prisma",() =>({
    prisma :{
        funcionario:{
            create:jest.fn() //para que  serve a função fn e o mock
        },
    },

}));

describe ("testando a funcão de criar um funcionário", () => {
    let appMock:any;
    beforeEach(() => {
        appMock = {
            post:jest.fn((route,handler) => {
                appMock.handler = handler;
            }),
        };
        Create_employe(appMock);
    })
});
it("deve criar um funcionário com sucesso", async () =>{

    const req ={
        body:{
            nome:"Miguel luamba ",
            bilhete:"123456",
            telefone:"123456",

        }
    }

    const res = {
        status:jest.fn().mockReturnThis(),
        send:jest.fn(),
    };

    (prisma.funcionario.create as jest.Mock).mockResolvedValue({
        id:"123",
        ...req.body,
    });
    expect(prisma.funcionario.create).toHaveBeenCalledWith({
        data:req.body,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
        id:"123",
        ...req.body,
    });
} );


// chamar a função da rota simulada

