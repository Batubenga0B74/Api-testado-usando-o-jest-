import type { FastifyInstance } from "fastify";
import { prisma } from "../../service/prisma";


export function delete_products(app:FastifyInstance){
    //usamos uma requisição via parametro porque estamos a lidar com apenas 1 dados que é o ID
    app.delete<{Params:{id:string}}>("/delete/:id",async(req,res)=>{
        const {id} = req.params
        //ele aqui vai procurar o id do produto acima enviado 
        const verify = await prisma.produtos.findUnique({
            where:{
                id
            }
        }) 
        
        if(!verify?.id)return res.status(404).send({menssage:"product not found"})
        
        await prisma.produtos.delete({
            where:{
                id
            }
        }).then(dd=>{
            return res.status(200).send({menssage:"sucessful deleted"})
        }).catch(err=>{
            return res.status(500).send({menssage:"faild in server "})
        })
    })
}