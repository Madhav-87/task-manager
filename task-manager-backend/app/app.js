const express=require('express');
const app=express();
const cors=require('cors');
const helmet=require('helmet');
const ratelimiter=require("express-rate-limit");
const router=require('../routes/router.js');
const limiter=ratelimiter({
    windowMs:60*1000,
    max:100,
    message:"Too many message"
});
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);
app.use('/',router);

app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || 500).json({success:false,message:err.message || "Server error..!"});
})

module.exports={app}
