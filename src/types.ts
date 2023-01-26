export type TUser = {
    id: string,
    email: string,
    password: string
} 

export type TProduct = {
    id:string,
    name:string,
    price:number,
    category: CATEGORY_PRODUCT
}

export enum CATEGORY_PRODUCT {
    ACCESSORIES = "Acessórios",
    CLOTHES_AND_SHOES = "Roupas e calçados",
    ELECTRONICS = "Eletrônicos"
}

export type TPurchase = {
    userId:string,
    productId:string,
    quantity:number,
    totalPrice:number
}

