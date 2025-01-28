// essa instancia permite fraguimentar o fastify
import type {FastifyInstance} from "fastify"
import { ProductsType } from "./products.dto"
import { prisma } from "../../service/prisma"

export function create_product(app:FastifyInstance){
    app.post<{Body:ProductsType}>("/create" ,async(req,res)=>{
        //desestruturar os dados vinda do corpo da requisição 
        // const data= req.body
        const {descricao,nome,preco} = req.body
        //verificar se existe dados  no corpo da nossa requisição
        if(!descricao )return res.status(404).send({menssage:"descrition is required"})
            if(!nome)return res.status(404).send({menssage:"Name is required"})
                if(!preco)return res.status(404).send({menssage:"preco is required"})
        // nesse código estamos a tentar criar um novo produto
        try {
           const data = await prisma.produtos.create({
            data: {
                descricao,
                nome,
                preco
            }
           })

           return res.status(200).send(data)
        } catch (error) {
            return res.status(404).send({menssage:"server not responding, try again later"})
        }
    })
}
