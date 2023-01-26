import { 
    getProductById, 
    queryProductsByName,
    createPurchase,
    getAllPurchasesFromClientId 
} from "./database";

console.log(queryProductsByName("televisão"));
console.log(createPurchase("1", "1", 3, 15));