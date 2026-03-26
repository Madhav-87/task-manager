const {generateToken,verify}=require('../utils/authMiddleware.js');
const model=require('../model/db.js');

async function loginUser(req,res){
    const userData=req.body;
    if(!userData)
        res.status(401).json({message:"invalid user!"});
    const user=await model.loginUser(userData);
    if(!user)
        res.status(401).json({message:"invalid user!"});

    const token=generateToken(user);
    res.status(200).json({success:true,message:"login grant..!",userToken:token});
}
function setTask(req,res){
    const userData=req.body;
    const result=model.setTask(userData.title,userData.desc);
    if(result)
        res.status(201).json({message:"record added!",success:true});
    else
        res.status(500).json({message:"server error!",success:false});
}
async function getTask(req,res){
    const result=await model.getTask(req.user.id);
    if(result)
        res.status(200).json({message:"data sent!",success:true,userData:result});
    else
        res.status(500).json({message:"server error!",success:false});
}
async function updateTask(req,res){
    const user=req.body;
    const result=await model.updateTask(req.user.id,user);
    if(result)
        res.status(200).json({message:"data update!",success:true,userData:result});
    else
        res.status(500).json({message:"server error!",success:false});
}
async function deleteTask(req,res){
    const {title}=req.body;
    const result=await model.deleteTask(req.user.id,title);
    if(result)
        res.status(200).json({message:"row deleted!",success:true,userData:result});
    else
        res.status(500).json({message:"server error!",success:false});
}
module.exports={loginUser,setTask,getTask,updateTask,deleteTask}