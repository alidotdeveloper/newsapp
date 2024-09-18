const { Sequelize } = require('sequelize');
require('dotenv').config();
const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);
const ConnectDb = async()=>{
    try {
           const sequelize = new Sequelize('mysql://root:admin@localhost:3306/blog') 
            sequelize.authenticate().then(() => {
               console.log('Connection has been established successfully.');
            }).catch((error) => {
               console.error('Unable to connect to the database: ', error);
            });
           
           
    } catch (error) {
        console.error("error while connecting", error);
        
    }

}

module.exports = ConnectDb;