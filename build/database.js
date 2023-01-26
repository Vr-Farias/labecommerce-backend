"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromClientId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [{
        id: "vanessa01",
        email: "vane01@batata.com",
        password: "pastadeatum"
    },
    {
        id: "bardo04",
        email: "bardobardo@batata.com",
        password: "tocaraul"
    }
];
exports.products = [{
        id: "05",
        name: "televisão",
        price: 5000,
        category: types_1.CATEGORY_PRODUCT.ELECTRONICS
    },
    {
        id: "09",
        name: "tênis nike",
        price: 200,
        category: types_1.CATEGORY_PRODUCT.CLOTHES_AND_SHOES
    }];
exports.purchases = [{
        userId: "bardo04",
        productId: "09",
        quantity: 5,
        totalPrice: 1000
    },
    {
        userId: "vanessa01",
        productId: "05",
        quantity: 2,
        totalPrice: 10000
    }];
function createUser(id, email, password) {
    exports.users.push({
        id,
        email,
        password
    });
    return ("Cadastro realizado com sucesso");
}
exports.createUser = createUser;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProduct(id, name, price, category) {
    exports.products.push({
        id,
        name,
        price,
        category
    });
    return ("Produto criado com sucesso");
}
exports.createProduct = createProduct;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function getProductById(id) {
    return exports.products.find(product => product.id === id);
}
exports.getProductById = getProductById;
function queryProductsByName(q) {
    return exports.products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
}
exports.queryProductsByName = queryProductsByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    exports.purchases.push({
        userId,
        productId,
        quantity,
        totalPrice
    });
    return ("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function getAllPurchasesFromClientId(clientIdToSearch) {
    return exports.purchases.filter(purchase => purchase.userId === clientIdToSearch);
}
exports.getAllPurchasesFromClientId = getAllPurchasesFromClientId;
//# sourceMappingURL=database.js.map