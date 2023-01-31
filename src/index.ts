import express, { Request, Response} from 'express';
import cors from 'cors';
import { products, purchases, users } from './database';
import { TProduct, TUser, TPurchase, CATEGORY_PRODUCT } from './types';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


// ping - pong!
// app.get("/ping", (req: Request, res: Response) => {
//   res.send("Pong!");
// });

//get all users
app.get('/users', (req:Request, res:Response)=> {
    res.status(200).send(users)
})

//edit user by id
app.put('/users/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const newId = req.body.id as string
    const newEmail = req.body.email as string
    const newPassword = req.body.password as string

    const filterUser = users.find((user) => user.id === id)

    if(filterUser){
        filterUser.id = newId || filterUser.id
        filterUser.email = newEmail || filterUser.email
        filterUser.password = newPassword || filterUser.password
    }

    res.status(200).send("Cadastro atualizado com sucesso.")
})

//get all products
app.get('/products', (req:Request, res:Response)=> {
    res.status(200).send(products)
})

//edit product by id
app.put('/products/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const newId = req.body.id as string | undefined
    const newName = req.body.name as string | undefined
    const newPrice = req.body.price as number | undefined
    const newCategory = req.body.category as CATEGORY_PRODUCT | undefined

    const filterProd = products.find((product) => product.id === id)

    if(filterProd){
        filterProd.id = newId || filterProd.id
        filterProd.name = newName || filterProd.name
        filterProd.price = newPrice || filterProd.price 
        filterProd.category = newCategory || filterProd.category
    }
    res.status(200).send("Atualização realizada com sucesso!")
})

//get all purchases
app.get('/purchases', (req:Request, res:Response)=> {
    res.status(200).send(purchases)
})

//purchases by id
app.get('/users/:id/purchases', (req:Request,res:Response) => {
    const id = req.params.id

    const filterUserPurchase = purchases.find((purchase) => purchase.userId === id)

    res.status(200).send(filterUserPurchase)
})

//products search
app.get('/products/search', (req:Request, res:Response) => {
    const q = req.query.q as string

    const productsFilters = products.filter(
        (product) => product.name.toLowerCase().includes(q.toLowerCase())
        )
    res.status(200).send(productsFilters)
})

//products by id
app.get('/products/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const result = products.find((product) => product.id === id)

    res.status(200).send(result)
})

//new users
app.post('/users', (req:Request, res:Response)=>{
    const id = req.body.id
    const email = req.body.email
    const password = req.body.password

    const newUser: TUser = {
        id,
        email,
        password
    }

    users.push(newUser)

    res.status(201).send("Cadastro realizado com sucesso.")
})

//new products
app.post('/products', (req:Request, res:Response)=>{
    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const category = req.body.category

    const newProduct : TProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)

    res.status(201).send("Produto cadastrado com sucesso.")
})

//new purchases
app.post('/purchases', (req:Request, res:Response)=>{
    const userId = req.body.userId
    const productId = req.body.productId
    const quantity = req.body.quantity
    const totalPrice = req.body.totalPrice

    const newPurchase : TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice 
    }

    purchases.push(newPurchase)

    res.status(201).send("Compra realizada com sucesso.")
})

//delete users
app.delete('/users/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const userIndex = users.findIndex((user) => user.id === id)

    if(userIndex >= 0){
        users.splice(userIndex, 1)
    }

    res.status(200).send("Usuário removido com sucesso.")
})

//delete products
app.delete('/products/:id', (req:Request, res:Response) => {
    const id = req.params.id

    const prodIndex = products.findIndex((product) => product.id === id)

    if(prodIndex >= 0){
        products.splice(prodIndex, 1)
    }

    res.status(200).send("Produto removido com sucesso.")
})