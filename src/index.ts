import express, { Request, Response} from 'express';
import cors from 'cors';
import { createProduct, createPurchase, createUser, products, purchases, queryProductsByName, users } from './database';
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
app.get('/users',(req:Request, res:Response)=>{
    try {
        res.status(200).send(users)       
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)        
    }
    
})

//edit user by id
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;

        const user = users.find(user => user.id === id);

        if (!user) {
            res.status(404);
            throw new Error ("Usuário não encontrado");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("Email deve ser uma string");
            }
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Senha deve ser uma string");
            }
        }
// atualização
        user.email = email || user.email;
        user.password = password || user.password;

        res.status(200).send("Cadastro atualizado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
    
})

//get all products
app.get('/products',(req:Request, res:Response)=>{
    try {
        res.status(200).send(products) 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)   
        
    }
})

//edit product by id
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;

        const product = products.find(product => product.id === id);

        if (!product){
            res.status(404);
            throw new Error ("Produto não encontrado.");
        }

        if (name !== undefined){
            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("Insira nome em string.");
            }
        }

        if (price !== undefined){
            if (typeof price !== "number"){
                res.status(400);
                throw new Error ("Valor deve ser um número.");
            }
        }

        if (category !== undefined){
            if (
                category !== "Acessórios" &&
                category !== "Roupas" &&
                category !== "Eletrônicos"
            ){
                res.status(400);
                throw new Error ("Escolha uma das categorias existentes.");
            }
        }
//atualização
        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;

        res.status(200).send("Produto atualizado com sucesso!");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

//get all purchases
app.get('/purchases', (req:Request, res:Response)=> {
    res.status(200).send(purchases)
})

//purchases by id
app.get("/users/:id/purchases", (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const result = purchases.filter(purchase => purchase.userId === userId);

        if (!result){
            res.status(404);
            throw new Error ("Compra não encontrada.");
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

//products search
app.get('/products/search',(req:Request, res:Response)=>{
    try {
        const q = req.query.q as string;
    
            if (q !== undefined){
                if (q.length < 1){
                    res.status(400);
                    throw new Error ("Insira ao menos um carater.");
                }
            } else {
                res.status(400);
                throw new Error ("Indefinido.");
            }
            const result = queryProductsByName(q);
    
            res.status(200).send(result);
    
        
    } catch (error) {
            console.log(error)
            if (res.statusCode === 200){
                res.status(500);
            }
            res.send(error.message);
    }
        
    
    })

//products by id
app.get("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const result = products.find(product => product.id === id);
        
        if (!result){
            res.status(404);
            throw new Error ("Produto não encontrado");
        }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }   
})

//new users
app.post('/users',(req:Request,res:Response)=>{
    try {
        const id = req.body.id
        const email = req.body.email
        const password = req.body.password
        
        const newUser:TUser={
            id:id,
            email:email,
            password:password,
        }

        if (id !== undefined){
            
        if (typeof id !== "string"){
         res.status(400);
                throw new Error ("Id precisa ser uma string.");
            }
 for (let i = 0; i < users.length; i++){
                if (users[i].id === id){
                    res.status(400);
                    throw new Error ("ID já cadastrada.");
                }
            }
        } else {
            res.status(400);
            throw new Error ("Necessário informar ID.");
        }

        if (email !== undefined){
            if (typeof email !== "string"){
                res.status(400);
                throw new Error ("E-mail do usuário deve ser uma string");
            }

            for (let i = 0; i < users.length; i++){
                if (users[i].email === email){
                    res.status(400);
                    throw new Error ("E-mail informado já existente.");
                }
            }
        } else {
            res.status(400);
            throw new Error ("Informe um e-mail.");
        }

        if (password !== undefined){
            if (typeof password !== "string"){
                res.status(400);
                throw new Error ("Senha deve ser uma string.");
            }
        } else {
            res.status(400);
            throw new Error ("Informe uma senha.");
        }

        createUser(id, email, password);

    res.status(201).send('Cliente cadastrado com sucesso!')
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
        
    }

})

//new products
app.post('/products',(req:Request, res:Response)=>{

    try {
        const id = req.body.id
        const name = req.body.name
        const price = req.body.price
        const category = req.body.category
    
        const newProduct:TProduct = {
            id: id,
            name: name,
            price: price,
            category: category,
        }

        for (let i = 0; i < products.length; i++){
            if (products[i].id === id){
                res.status(400);
                throw new Error ("Produto já existente.");
            }
        }
        createProduct(id,name,price,category)
        res.status(201).send('Produto cadastrado com sucesso!')
        
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }

})

//new purchases
app.post('/purchase',(req:Request, res:Response)=>{
    try {
	    const userId = req.body.userId;
	    const productId = req.body.productId;
	    const quantity = req.body.quantity;
	    const totalPrice = req.body.totalPrice;

        if (userId !== undefined){
            if (typeof userId !== "string"){
                res.status(400);
                throw new Error ("ID do usuário deve ser uma string.");
            }

            const userOk = users.find((users) => users.id === userId);
            if (!userOk){
                res.status(404);
                throw new Error ("Usuário inexistente.");
            }
            
        } else {
            res.status(400);
            throw new Error ("Necessário informar ID.");
        }

        if (productId !== undefined){
            if (typeof productId !== "string"){
                res.status(400);
                throw new Error ("ID do produto deve ser uma string.");
            }

            
            const productExists = products.find(product => product.id === productId);
            if (!productExists){
                res.status(404);
                throw new Error ("Produto inexistente.");
            }

        } else {
            res.status(400);
            throw new Error ("Necessário ID do produto.");
        }

        if (quantity !== undefined){
            if (typeof quantity !== "number"){
                res.status(400);
                throw new Error ("Valor inválido.");
            }
        } else {
            res.status(400);
            throw new Error ("Informe a quantidade de produtos.");
        }

        if (totalPrice !== undefined){
            if (typeof totalPrice !== "number"){
                res.status(400);
                throw new Error ("Preço total incorreto.");
            }

            const product = products.find(product => product.id === productId);
            const { price } = product;
            if ((price * quantity) !== totalPrice){
                res.status(400);
                throw new Error ("Valor da compra incorreta.");
            }
        } else {
            res.status(400);
            throw new Error ("Valor não informado.");
        }
	
	    createPurchase(userId, productId, quantity, totalPrice);
	
	    res.status(201).send("Compra realizada com sucesso");

    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
})

//delete users
app.delete("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const userIndex = users.findIndex(user => user.id === id);
        if (userIndex >= 0){
            users.splice(userIndex, 1);
        } else {
            res.status(404);
            throw new Error ("Não encontrado");
        }
        res.status(200).send("Usuário deletado com sucesso.");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }  
})

//delete products
app.delete("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const productIndex = products.findIndex(product => product.id === id);
        if (productIndex >= 0){
            users.splice(productIndex, 1);
        } else {
            res.status(404);
            throw new Error ("Não encontrado.");
        }
        res.status(200).send("Produto deletado com sucesso.");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }  
})