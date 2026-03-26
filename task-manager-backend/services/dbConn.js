const mysql=require("mysql2");
const dotenv=require('dotenv');
const path=require("path");

dotenv.config({path:path.join(__dirname,"..","config",".env")});
const pool=mysql.createPool({
    user:'root',
    host:'localhost',
    port:3306,
    database:'taskMang',
    password:process.env.DB_PASS
}).promise();

module.exports={pool}