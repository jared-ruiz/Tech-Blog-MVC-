//import sequelize constructor from library
const Sequelize = require('sequelize');

//execute whenever connection is used
require('dotenv').config();

//create connection to database, pass in mysql information for user and possword each time
//server is activated
let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new sequelize(process.env.JAWSDB_URL);
}
else {
    sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    });
}


module.exports = sequelize;