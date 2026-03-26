const {pool}=require('../services/dbConn.js');

async function loginUser(userData){
        try{
            const [user]=await pool.query(
                `SELECT *
                FROM useraccount
                WHERE email=?
                AND
                password=?`,[userData.email,userData.password]
            );
            return user[0]
        }
        catch(err){
            throw err;
        }
}
async function setTask(title,desc){
        try{
            const user=await pool.query(
                `
            INSERT INTO userTask (task,info)
            VALUES
            (?,?)
                `,[title,desc]
            );
            return user;
        }
        catch(err){
            throw err;
        }
}
async function getTask(id){
    try{
        const [userData]=await pool.query(`
        SELECT * FROM userTask
        WHERE userid=?    
            `,[id]
        )
        return userData;
    }
    catch(err){
        throw err;
    }
}
async function updateTask(id,user){
    try{
        const [userData]=await pool.query(`
        UPDATE userTask
        SET task=?,
        info=?
        WHERE userid=?
        AND task=?
            `,[user.title,user.desc,id,user.oldtitle]
        )
        return userData;
    }
    catch(err){
        throw err;
    }
}
async function deleteTask(id,title){
    try{
        const [userData]=await pool.query(`
        DELETE FROM userTask
        WHERE userid=?
        AND task=?
            `,[id,title]
        )
        return userData;
    }
    catch(err){
        throw err;
    }
}
module.exports={loginUser,setTask,getTask,updateTask,deleteTask}