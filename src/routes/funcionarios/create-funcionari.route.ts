// essa instancia permite fraguimentar o fastify
import type { FastifyInstance } from "fastify";
import { FuncionariosType } from "./funcionarios.dto";
import { prisma } from "../../service/prisma";

//criar a funcão que vai criar o funcionário
export function Create_funcionario(app:FastifyInstance){
    app.post<{Body:FuncionariosType}>("/create", async(req,res)=>{
        //desestruturando as informações vinda do Body
        const {telefone,bilhete,nome} =req.body
        //verificar se os dados existem no corpo da requisição
        if(!telefone) res.status(404).send({message:"cellfone is required"})
            if(!bilhete) res.status(404).send({mesage:"identificate is required"})
                if(!nome) res.status(404).send({message:"Name is required"})
        //criar funcionarios
        try {
            const data = await prisma.funcionario.create({
             data: {
               bilhete,
               telefone,
               nome
             }
            }) 
            return res.status(200).send(data)
         } catch (error) {
             return res.status(404).send({menssage:"server not responding, try again later"})
         }
    })
}