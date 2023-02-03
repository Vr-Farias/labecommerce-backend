import express, { Request, Response} from 'express';
import cors from 'cors';
import { products, purchases, queryProductsByName, users } from './database';
import { TProduct, TUser, TPurchase} from './types';
import { Category } from './types';
import { db } from './database/knex';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});


//GET ALL USERS
app.get('/users', async (req:Request, res:Response)=>{
    try {

        // const result = await db.raw(
        //     `
        //     SELECT * FROM users;
        //     `
        // )

        const result = await db("users")

        res.status(200).send({users: result})       
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)        
    }
    
});

//EDIT USER BY ID
app.put("/user/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const user = users.find(user => user.id === id);
        const email = users.find(user => user.email === newEmail);

        if (!user) {
            res.status(404);
            throw new Error ("Usuário não encontrado");
        }

        const newEmail = req.body.email as string | undefined;
        const newPassword = req.body.password as string | undefined;

        // if (email !== undefined){
        //     if (typeof email !== "string"){
        //         res.status(400);
        //         throw new Error ("Email deve ser uma string");
        //     }
        // }

        // if (password !== undefined){
        //     if (typeof password !== "string"){
        //         res.status(400);
        //         throw new Error ("Senha deve ser uma string");
        //     }
        // }
        
// atualização
        if (newEmail && email) {
          res.status(400);
          throw new Error("E-mail já existente.")
        }

        if(newPassword && newPassword.length < 6){
          res.status(400);
          throw new Error("Senha deve conter mínimo de 6 caracteres.")
        }

        user.email = newEmail || user.email;
        user.password = newPassword || user.password;

        res.status(200).send("Cadastro atualizado com sucesso");
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
    
});
 
//NEW USERS
app.post('/users', async (req:Request,res:Response)=>{
  try {
      const {id, name, email, password, created_at} = req.body
     
      if (id !== undefined){
          
      if (typeof id !== "string"){
       res.status(400);
              throw new Error ("ID precisa ser uma string.");
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

      if (name !== undefined) {
          if (typeof name !== "string") {
            res.status(400);
            throw new Error("Nome deve ser uma string.");
          }
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

      const newUser = {
          id,
          name,
          email, 
          password,
          created_at
      };
      users.push(newUser);

      // await db.raw(
      //     `
      //     INSERT INTO users (id, name, email, password)
      //     VALUES ("${id}", "${name}", "${email}","${password}")
      //     `
      // );

      await db.insert({
        id: id,
        name: name, 
        email: email,
        password: password,
        created_at: created_at
      }).into("users")

  res.status(201).send('${name} cadastrado com sucesso!')
  } catch (error) {
      console.log(error)
      if (res.statusCode === 200){
          res.status(500);
      }
      res.send(error.message);
      
  }

});

//============================

//GET ALL PRODUCTS
app.get('/products', async (req:Request, res:Response)=>{
    try {
        // const result = await db.raw(
        //     ` 
        //     SELECT * FROM products
        //     `
        // )

        const result = await db("products")

        res.status(200).send({products: result}) 
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
        res.send(error.message)   
        
    }
});

//EDIT PRODUCT BY ID
app.put("/product/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const product = products.find(product => product.id === id);

        if (!product){
            res.status(400);
            throw new Error ("Produto não encontrado.");
        }
//atualização

        const newName = req.body.name as string | undefined;
        const newPrice = req.body.price as number | undefined;
        const newCategory = req.body.category as Category | undefined;

        

        if(newName && newName.length < 2){
          res.status(400);
          throw new Error("Novo nome deve conter mais de 2 caracteres.")
        }

        if(typeof newPrice !== "number"){
          res.status(400);
          throw new Error("Valor informado incorretamente.")
        }
        
        product.name = newName || product.name;
        product.price = newPrice || product.price;
        product.category = newCategory || product.category;
        
        res.status(200).send("Produto atualizado com sucesso!");
    } catch (error) {
        console.log(error)
        if (res.statusCode === 200){
            res.status(500);
        }
        res.send(error.message);
    }
});

//GET PRODUCT BY ID
app.get("/products/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
  
      const [product] = await db.raw(`
      SELECT * FROM products
      WHERE id = "${id}"
      `);
  
      if (!product) {
        res.status(400);
        throw new Error("Produto inexistente.");
      }
  
      res.status(200).send({ product: product });
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });

//NEW PRODUCTS
app.post('/products', async (req:Request, res:Response)=>{

  try {
      const {id, name, price, description, category, image_url} = req.body

      if(id !== undefined){
          if (typeof id !== "string"){
              res.status(400);
              throw new Error("ID deve ser uma string.")
          }
      }

      for (let i = 0; i < products.length; i++){
          if (products[i].id === id){
              res.status(400);
              throw new Error ("Produto já existente.");
          }
      }

      if (name !== undefined) {
          if (typeof name !== "string") {
            res.status(400);
            throw new Error("Nome deve ser uma string");
          }
        }
    
        if (id.length < 1 || name.length < 1) {
          res.status(400);
          throw new Error(
            "ID/Nome de produto deve ter no minímo 1 caractere."
          );
        }
    
        if (price !== undefined) {
          if (typeof price !== "number") {
            res.status(400);
            throw new Error("Valor do produto deve ser um número.");
          }
        }
    
        if (description !== undefined) {
          if (typeof description !== "string") {
            res.status(400);
            throw new Error("Descrição deve ser uma string.");
          }
        }
    
        if (category !== undefined) {
          if (typeof category !== "string") {
            res.status(400);
            throw new Error("Categoria deve ser uma string.");
          }
        }
    
        if (image_url !== undefined) {
          if (typeof image_url !== "string") {
            res.status(400);
            throw new Error("Imagem inválida, insira um link.");
          }
        }
    
        const newProduct = {
          id,
          name,
          price,
          description,
          category,
          image_url,
        };
        products.push(newProduct);
    
        await db.raw(
          `
          INSERT INTO products (id, name, price, description, category, image_url)
          VALUES 
          ("${id}", "${name}", "${price}", "${description}", "${category}", "${image_url}");
          `
          );
    
        res.status(201).send(`${name} cadastrado com sucesso!`);
      } catch (error: any) {
        console.log(error);
    
        if (res.statusCode === 200) {
          res.status(500);
        }
    
        res.send(error.message);
      }
    });

// ============================

//GET ALL PURCHASES
app.get('/purchases', async (req:Request, res:Response)=> {
    try {
      const result = await db("purchases")
      
      res.status(200).send({purchases: result})
    } catch(error){
      console.log(error)

      if(res.statusCode === 200){
        res.status(500)
      }
      res.send(error.message)
    }
    
});

//GET PURCHASE BY ID
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
  
      const [purchase] = await db("purchases").select(
        "puchases.id AS purchaseID",
        "purchases.total_price AS totalPrice",
        "purchases.created_at AS createdAt",
        "purchases.paid AS isPaid",
        "user.id AS buyerID",
        "users.email",
        "users.name"
      ).innerJoin("users", "purchases.buyer", "=", "users.id").where({'purchases.id': id});
      
      // await db.raw(`
      //   SELECT * FROM purchases
      //   WHERE buyer = "${buyer}"
      // `);
  
      if (!purchase) {
        res.status(400);
        throw new Error("Compra inexistente.");
      }
  
    } catch (error) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });

//NEW PURCHASES
app.post('/purchase', async (req:Request, res:Response)=>{
  try {
      const { id, buyer, total_price, created_at, paid } = req.body as TPurchase;
  
      if (id !== undefined) {
        if (typeof id !== "string") {
          res.status(400);
          throw new Error("ID deve ser uma string.");
        }
      }
  
      const [findPurchaseId] = await db.raw(
        `SELECT * FROM purchases WHERE id="${id}"`
      );
      if (findPurchaseId) {
        res.status(400);
        throw new Error("ID de compra já existente.");
      }
  
      if (buyer !== undefined) {
        if (typeof buyer !== "string") {
          res.status(400);
          throw new Error("Comprador deve ser uma string.");
        }
      }
  
      const [findUserId] = await db.raw(
        `SELECT * FROM users WHERE id="${buyer}"`
      );
      if (!findUserId) {
        res.status(400);
        throw new Error("ID de usuário inexistente.");
      }
  
      if (id.length < 1 || buyer.length < 1) {
        res.status(400);
        throw new Error("Informações incompletas.");
      }
  
      if (total_price !== undefined) {
        if (typeof total_price !== "number") {
          res.status(400);
          throw new Error("Valor total deve ser um número.");
        }
      }
      if (paid !== undefined) {
        if (typeof paid !== "number") {
          res.status(400);
          throw new Error("informe 0 ou 1 para informar status.");
        }
      }
  
      const newPurchase = {
        id,
        buyer,
        total_price,
        created_at,
        paid,
      };
      purchases.push(newPurchase);
  
      res.status(201).send("Compra realizada com sucesso!");
  
      await db.raw(`
      INSERT INTO purchases ( id, buyer, total_price, paid)
      VALUES ("${id}", "${buyer}", "${total_price}", "${paid}");
      `);
    } catch (error: any) {
      console.log(error);
  
      if (res.statusCode === 200) {
        res.status(500);
      }
  
      res.send(error.message);
    }
  });


// =============================

//products search
// app.get('/products/search', async (req:Request, res:Response)=>{
//     try {
//         const q = req.query.q as string;
    
//                 if (q.length < 1){
//                     res.status(400);
//                     throw new Error ("Insira ao menos um carater.");
//                 } 
//             const product = await db.raw(
//                 `
//                 SELECT * FROM products
//                 WHERE name LIKE "%${q}%";
//                 `
//             );
    
//             res.status(200).send({product: product});
    
        
//     } catch (error) {
//             console.log(error)
//             if (res.statusCode === 200){
//                 res.status(500);
//             }
//             res.send(error.message);
//     }
        
    
//     });

// //delete users
// app.delete("/user/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;
//         const userIndex = users.findIndex(user => user.id === id);
//         if (userIndex >= 0){
//             users.splice(userIndex, 1);
//         } else {
//             res.status(404);
//             throw new Error ("Não encontrado");
//         }
//         res.status(200).send("Usuário deletado com sucesso.");
//     } catch (error) {
//         console.log(error);
//         if (res.statusCode === 200){
//             res.status(500);
//         }
//         res.send(error.message);
//     }  
// });

// //delete products
// app.delete("/product/:id", (req: Request, res: Response) => {
//     try {
//         const id = req.params.id;
//         const productIndex = products.findIndex(product => product.id === id);
//         if (productIndex >= 0){
//             users.splice(productIndex, 1);
//         } else {
//             res.status(404);
//             throw new Error ("Não encontrado.");
//         }
//         res.status(200).send("Produto deletado com sucesso.");
//     } catch (error) {
//         console.log(error);
//         if (res.statusCode === 200){
//             res.status(500);
//         }
//         res.send(error.message);
//     }  
// });