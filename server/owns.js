const express = require('express');
const router = express.Router();
const {Client} = require('pg');
const client = new Client({
    user: 'postgres',
    password: 'CS366',
    host: 'localhost',
    port: 5432,
    database: 'tradingpractice'
});

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
    next();
});
//connect to the database
execute();
async function execute(){
    await connect();
}
async function connect(){
    try{
        await client.connect();
        console.log(`Connected`);
    }catch(e){
        console.error(`connection failed ${e}`);
    }
}

router.get('/api/owns', async (req, res) => {
    console.log("getting all user stocks");
    const owns = await readOwns();
    res.json(owns);
})
router.get('/api/own/:username', async (req, res) => {
    console.log("getting specific user stocks");
    const own = await readOwn(req.params.username);
    res.json(own);
})

router.post('/api/owns', async (req, res)=>{
    let result = {};
    try{
        const reqJson = req.body;
        await createOwn(reqJson.username, reqJson.name, reqJson.price_bought_at, reqJson.price_now, reqJson.amount);
        result.success = true;
        result.body = reqJson;
    }catch(e){
        console.log(`There was an error ${e}`);
        result.success = false;
    }finally{
        res.json(result);
    }
})

router.delete('/api/owns', async (req, res) => {
    let result = {};
    try{
        const reqJson = req.body;
        await deleteOwn(reqJson.username, reqJson.name);
        result.success = true;
    }catch(e){
        console.log(`There was an error ${e}`);
        result.success = false;
    }finally{
        res.json(result);
    }
})

router.put('/api/owns', async (req, res) => {
    let result = {};
    try{
        const reqJson = req.body;
        await updateOwn(reqJson.username, reqJson.name, reqJson.price_bought_at, reqJson.price_now, reqJson.amount);
        result.success = true;
        result.body = reqJson;
    }catch(e){
        console.log(`There was an error ${e}`);
        result.success = false;
    }finally{
        res.json(result);
    }
})

async function readOwns(){
    try{
        const results = await client.query("select * from owns");
        return results.rows;
    }catch(e){
        return {msg: `${e}`};
    }
}

async function readOwn(username){
    try{
        const results = await client.query("select * from owns where username = $1", [username]);
        return results.rows;
    }catch(e){
        return {msg: `${e}`};
    }
}

async function createOwn(username, name, price_bought_at, price_now, amount){
    try{
        await client.query("insert into owns (username, name, price_bought_at, price_now, amount) values ($1, $2, $3, $4, $5)",
         [username, name, price_bought_at, price_now, amount]);
         await client.query("delete from owns where amount = 0");
        return true;
    }catch(e){
        return false;
    }
}

async function deleteOwn(username, name){
    try{
        await client.query("delete from owns where username = $1 and name = $2", [username, name]);
        await client.query("delete from owns where amount = 0");
        return true;
    }catch(e){
        return false;
    }
}


async function updateOwn(username, name, price_bought_at, price_now, amount){
    try{
        await client.query("update owns set amount = amount + $1 where name = $2 and username = $3", [amount, name, username]);
        await client.query("update owns set price_bought_at = $1 where name = $2 and username = $3", [price_bought_at, name, username]);
        await client.query("delete from owns where amount = 0");
        console.log(amount);
        return true;
    }catch(e){
        return false;
    }
}


module.exports = router;