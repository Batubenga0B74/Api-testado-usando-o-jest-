import {fastify} from "fastify";
import {create_product}from "./routes/products/create-products.route"
import { list_All_products } from "./routes/products/list-all-products.route";
import { update_products } from "./routes/products/update-products.route";
import { delete_products } from "./routes/products/delete-produvts.route";
import { Create_funcionario} from "./routes/funcionarios/create-funcionari.route"
import { list_All_Funcionario } from "./routes/funcionarios/list-all-funcionario.route";

const app = fastify()
//rotas Anunciadas do produto
app.register(create_product,{prefix:"products"})
app.register(list_All_products,{prefix:"products"})
app.register(update_products,{prefix:"products"})
app.register( delete_products,{prefix:"products"})

app.register(Create_funcionario,{prefix:"funcionario"})
app.register(list_All_Funcionario,{prefix:"funcionario"})

//rotas Anunciadas do FUbcionario 


app.listen({port:3333 },()=>{console.log("server up")})
