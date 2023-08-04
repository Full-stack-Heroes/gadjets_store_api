"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbInit_1 = require("./db/dbInit");
const products_1 = require("./controllers/products");
const phones_1 = require("./controllers/phones");
const tablets_1 = require("./controllers/tablets");
const accessories_1 = require("./controllers/accessories");
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, dbInit_1.dbInit)();
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use(express_1.default.static(__dirname + '/public'));
app.get('/products', products_1.productsController.getProducts);
app.get('/products/discount', products_1.productsController.getDiscount);
app.get('/phones', phones_1.phonesController.getAll);
app.get('/phones/new', phones_1.phonesController.getNew);
app.get('/phones/:id', phones_1.phonesController.getById);
app.get('/phones/:id/recommended', phones_1.phonesController.getRecommended);
app.get('/tablets', tablets_1.tabletsController.getAll);
app.get('/tablets/new', tablets_1.tabletsController.getNew);
app.get('/tablets/:id', tablets_1.tabletsController.getById);
app.get('/tablets/:id/recommended', tablets_1.tabletsController.getRecommended);
app.get('/accessories', accessories_1.accessoriesController.getAll);
app.get('/accessories/new', accessories_1.accessoriesController.getNew);
app.get('/accessories/:id', accessories_1.accessoriesController.getById);
app.get('/accessories/:id/recommended', accessories_1.accessoriesController.getRecommended);
app.listen(3000, () => {
    console.log(`Server works on ${process.env.SERVER_HOST}:${process.env.PORT}`);
});
