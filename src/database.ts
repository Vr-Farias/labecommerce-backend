import { Category, TProduct, TPurchase, TUser } from "./types"

export const users:TUser[] = [{
    id: "01",
    name: "Vanessa",
    email: "vane01@batata.com",
    password: "pastadeatum",
    created_at:""
},
{
    id: "02",
    name:"Hugo",
    email:"hugo@gmail.com",
    password:"hfsdm123",
    created_at:"",
},
{
    id: "03",
    name:"Igor",
    email:"igor@gmail.com",
    password:"fazoL123",
    created_at:"",
},
{
    id: "04",
    name:"Bardo",
    email: "bardobardo@batata.com",
    password: "tocaraul",
    created_at:""
}
]

export const products:TProduct[] = [{
    id: "01",
    name:"calça vomit3d",
    price: 200,
    description:"calça moletom ilustrada",
    category: Category.CLOTHES_AND_SHOES,
    image_url:"https://gkpb.com.br/wp-content/uploads/2021/12/gkpb-vomit3d-colecao-one-piece-laboon.jpg"
},
{
    id: "02",
    name:"xiaomi 9A",
    price: 2000,
    description:"aparelho celular modelo Mi A9",
    category:Category.ELECTRONICS,
    image_url:"https://d1r6yjixh9u0er.cloudfront.net/Custom/Content/Products/17/89/1789_redmi-9a-32gb_m25_637838907707297495.jpg"
},
{
    id: "03",
    name:"tênis nike",
    price: 200,
    description:"tênis airforce one",
    category:Category.CLOTHES_AND_SHOES,
    image_url:"https://imgnike-a.akamaihd.net/1920x1920/01301252.jpg"
},
{
    id: "04",
    name:"camisa vomit3d",
    price: 100,
    description:"camisa ilustrada especial",
    category:Category.CLOTHES_AND_SHOES,
    image_url:"https://lookgeekhome.files.wordpress.com/2021/12/1638485742775.jpg"
},
{
    id: "05",
    name:"televisão samsung",
    price: 5000,
    description:"aparelho eletrônico de televisão",
    category: Category.ELECTRONICS,
    image_url:"https://images.samsung.com/is/image/samsung/p6pim/br/un50au7700gxzd/gallery/br-uhd-4k-tv-un50au7700gxzd---532138276?$650_519_PNG$"
}]

export const purchases:TPurchase[] = [{
    id:"pc001",
    buyer:"04",
    total_price:5000,
    created_at: "",
    paid: 0
},
{
    id:"pc002",
    buyer:"01",
    total_price:3000,
    created_at: "",
    paid: 1 
}]

export function getAllUsers() : TUser[]{
    return users;
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

export function getAllPurchasesFromClientId(id : string) : TPurchase[] | undefined{
    return purchases.filter((purchase) => {return purchase.id === id});
}