"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
        name: "batata frita",
        price: 3,
        category: "congelados"
    },
    {
        id: "09",
        name: "pepino",
        price: 2,
        category: "verdura"
    }];
exports.purchases = [{
        userId: "bardo04",
        productId: "09",
        quantity: 5,
        totalPrice: 10
    },
    {
        userId: "vanessa01",
        productId: "05",
        quantity: 2,
        totalPrice: 6
    }];
//# sourceMappingURL=database.js.map