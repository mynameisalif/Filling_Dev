import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config();
const {DB_HOST , DB_PORT, DB_NAME , DB_USER,  DB_PASSWORD } = process.env
const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD,{
   host:DB_HOST,
   port : DB_PORT,
   dialect:"mysql"
});

export default db;