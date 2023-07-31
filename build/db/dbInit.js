"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv/config");
const models_1 = require("../models");
const URI = process.env.DB_URI || 'null';
exports.sequelize = new sequelize_typescript_1.Sequelize(URI, {
    models: models_1.models,
    dialectOptions: {
        ssl: true,
    },
});
