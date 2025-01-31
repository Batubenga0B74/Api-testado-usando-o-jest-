import {fastify} from "fastify";
import {create_product}from "./routes/products/create-products.route"
import { list_All_products } from "./routes/products/list-all-products.route";
import { update_products } from "./routes/products/update-products.route";
import { delete_products } from "./routes/products/delete-produvts.route";
import { Create_employe} from "./routes/employee/create-employee.route"
import { list_All_employe } from "./routes/employee/list-all-employe.route";
import{delete_employe}from "./routes/employee/delete-employe.route"

const app = fastify()
//rotas Anunciadas do produto
app.register(create_product,{prefix:"products"})
app.register(list_All_products,{prefix:"products"})
app.register(update_products,{prefix:"products"})
app.register( delete_products,{prefix:"products"})

app.register(Create_employe,{prefix:"employe"})
app.register(list_All_employe,{prefix:"employe"})
app.register(delete_employe,{prefix:"employe"})

//rotas Anunciadas do FUbcionario 


app.listen({port:3333 },()=>{console.log("server up")})
