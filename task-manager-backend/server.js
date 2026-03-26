const {app}=require('./app/app.js');
const dotenv=require('dotenv');
const path=require("path");

dotenv.config({path:path.join(__dirname,"config",".env")});

app.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server is listening on the port:${process.env.SERVER_PORT}`);
})