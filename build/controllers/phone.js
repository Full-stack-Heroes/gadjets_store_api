"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = void 0;
const phone_1 = require("../temp_models/phone");
function getProducts(req, res) {
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.size) || 10;
    const productsOnPage = (0, phone_1.getProductsOnPage)(pageNumber, pageSize);
    res.send(productsOnPage);
}
exports.getProducts = getProducts;
