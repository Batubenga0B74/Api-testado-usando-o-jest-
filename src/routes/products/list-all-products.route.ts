import type{FastifyInstance} from "fastify"
import { prisma } from "../../service/prisma"

export function list_All_products(app:FastifyInstance){
    app.get("/list",async(req,res)=>{
        try {
            const data = await prisma.produtos.findMany()
            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send({menssage :"erro no servidor"})
        }
    })
}