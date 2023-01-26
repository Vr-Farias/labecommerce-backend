import { CATEGORY_PRODUCT, TProduct, TPurchase, TUser } from "./types"

export const users:TUser[] = [{
    id: "vanessa01",
    email: "vane01@batata.com",
    password: "pastadeatum"
},
{
    id: "bardo04",
    email: "bardobardo@batata.com",
    password: "tocaraul"
}
]

export const products:TProduct[] = [{
    id: "05",
    name:"televisão",
    price: 5000,
    category: CATEGORY_PRODUCT.ELECTRONICS
},
{
    id: "09",
    name:"tênis nike",
    price: 200,
    category:CATEGORY_PRODUCT.CLOTHES_AND_SHOES
}]

export const purchases:TPurchase[] = [{
    userId:"bardo04",
    productId:"09",
    quantity: 5,
    totalPrice: 1000 
},
{
    userId:"vanessa01",
    productId:"05",
    quantity: 2,
    totalPrice: 10000 
}]

export function createUser(id : string, email : string, password : string) : string{
    users.push({
        id,
        email,
        password
    });
    return ("Cadastro realizado com sucesso");
}

export function getAllUsers() : TUser[]{
    return users;
}

export function createProduct(id : string, name : string, price : number, category : CATEGORY_PRODUCT) : string{
    products.push({
        id,
        name,
        price,
        category
    })
    return ("Produto criado com sucesso");
}

export function getAllProducts() : TProduct[]{
    return products;
}

export function getProductById(id : string) : (undefined | TProduct){
    return products.find(product => product.id === id);
}

export function queryProductsByName(q : string) : TProduct[]{
    return products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}

export function createPurchase(userId : string, productId : string, quantity : number, totalPrice : number) : string{
    purchases.push({
        userId,
        productId,
        quantity,
        totalPrice    
    })
    return ("Compra realizada com sucesso");
}

export function getAllPurchasesFromClientId(clientIdToSearch : string) : TPurchase[]{
    return purchases.filter(purchase => purchase.userId === clientIdToSearch);
}