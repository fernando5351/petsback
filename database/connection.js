const { Sequelize } = require('sequelize');
const { database, isProduction, isTest, isDevelopment } = require('../config');

let URL = '';
let developmentDB = `postgres://${database.user}:${database.password}@${database.host}:${database.port}/${database.name}`;
URL = isProduction ? database.URI: ( isTest? database.URI_TEST: developmentDB);

module.exports = {
    development: {
        dialect: 'postgres',
        url: URL
    },
    production: {
        dialect: 'postgres',
        url: URL,
        ssl: true,
        dialectOptions: {
            ssl: { require: true }
        }
    },
    test: {
        dialect: 'postgres',
        url: URL,
        ssl: true,
        dialectOptions: {
            ssl: { require: true }
        }
    }
};