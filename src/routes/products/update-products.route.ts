import type { FastifyInstance } from "fastify";
import { ProductsType } from "./products.dto";
import { prisma } from "../../service/prisma";

export function update_products(app:FastifyInstance){
    app.put<{Body:ProductsType}>("/update",async(req,res)=>{
        const data = req.body
        // verificar se os dados existem 
        if(!data.id) return res.status(404).send({menssage:"id é obrigatorio"})
                
            if(!data.descricao )return res.status(404).send({menssage:"descrition is required"})
                if(!data.nome)return res.status(404).send({menssage:"Name is required"})
                    if(!data.preco)return res.status(404).send({menssage:"preco is required"})
    
        const verify = await prisma.produtos.findUnique({where:{
            id:data.id
        }}).catch(err=>{
            return res.status(404).send({menssage:"server not responding, try again later"})
        })


        if(!verify?.id){
            return res.status(404).send({menssage:"produtos não encontrado"})
        }else{
            // aqui estamos a fazer a atualização do produto
            try {
                const newData = await prisma.produtos.update({
                    data,
                    where:{
                        id:data.id
                    }
                })
                return res.status(200).send({
                    menssage:"sucessfull updated",  
                    data: newData
                  })
            } catch (error) {
                return res.send({mensage:"server not replay"})
            }
        }
    })

}