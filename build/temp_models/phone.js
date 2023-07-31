"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsOnPage = void 0;
const temp_data_json_1 = __importDefault(require("../utils/temp_data.json"));
function getProductsOnPage(pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return temp_data_json_1.default.slice(startIndex, endIndex);
}
exports.getProductsOnPage = getProductsOnPage;
