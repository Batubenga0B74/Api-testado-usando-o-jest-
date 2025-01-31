import type { FastifyInstance } from "fastify";
import { prisma} from "../../service/prisma"

export function list_All_employe(app:FastifyInstance){
    app.get("/list",async(req,res)=>{
        try {
            const data = await prisma.funcionario.findMany()
            return res.status(200).send(data)
        } catch (error) {
            return res.status(500).send({message:"erro in server"})
        }
    })
}

