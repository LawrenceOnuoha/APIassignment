const Sequelize = require('sequelize');

let database = 'myfirstdb';
let username = 'root';
let password = 'arigato';

const config = new Sequelize(database, username, password, {dialect: 'mariadb'});

module.exports = config;