import { TProduct, TPurchase, TUser } from "./types"

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
    name:"batata frita",
    price: 3,
    category:"congelados"
},
{
    id: "09",
    name:"pepino",
    price: 2,
    category:"verdura"
}]

export const purchases:TPurchase[] = [{
    userId:"bardo04",
    productId:"09",
    quantity: 5,
    totalPrice: 10 
},
{
    userId:"vanessa01",
    productId:"05",
    quantity: 2,
    totalPrice: 6 
}]