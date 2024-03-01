const { Sequelize } = require('sequelize');
var initModels = require("./init-models");

const sequelize = new Sequelize('datn_database', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

var db = initModels(sequelize);

module.exports = db;



//npx sequelize-auto -o "./src/models" -d datn_database -h localhost -u root -p 3306 -x 1234 -e mysql --noAlias true 
