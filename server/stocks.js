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
//connect to the database
execute();
async function execute(){
    await connect();
}
async function connect(){
    try{
        await client.connect();
        startInterval();
        console.log(`Connected`);
    }catch(e){
        console.error(`connection failed ${e}`);
    }
}

function startInterval(){
    let price = 0;
    let basePrice = 0;
    setInterval(async ()=>{
        try{
            console.log("ran interval");
            const results = await client.query("select * from stocks");
            let myRows = results.rows;
            console.log(myRows);

            myRows.forEach(async stock => {
                let volatility = stock.volatility;
            //an upside of 4 gives the stock a %50 chance of rising and a %50 chance of falling
            //higher upside, the more rises. lower upside, the more falls.
                let upside = stock.upside;
                price = parseFloat(stock.price.replace(/[^0-9.]/g, ""));
                basePrice = parseFloat(stock.baseprice.replace(/[^0-9.]/g, ""));
                
                let newPrice = changePrice(price, volatility, upside, basePrice);
                await client.query("update stocks set price = $1 where name = $2", [newPrice, stock.name]);
                await client.query("update owns set price_now = $1 where name = $2", [newPrice, stock.name]);
                await client.query("delete from owns where amount = 0");
                //console.log(price);
                price = newPrice;
            })
            
            
            return true;
        }catch(e){
            return false;
        }
    }, 10000);

}
function changePrice(price, volatility, upside, basePrice){
    //Give a 1 in 10 chance of volatility * 10
    if(Math.random() < 0.1){
        console.log("high volatility");
        volatility *= 15;
    }


    let percentChange = (Math.random() * volatility) / 100;
    //console.log(Math.random() * upside, Math.sqrt(upside));
    let priceToBasePriceRatio = price/basePrice;
    let negative = (Math.random() * upside * (1/priceToBasePriceRatio) < Math.sqrt(upside));
    if(negative){
        percentChange = -percentChange;
    }
    let newStockPrice = price * (1+percentChange);
    //console.log(percentChange);
    //console.log(newStockPrice);
    return newStockPrice;
}

router.get('/api/userStocks/:username', async (req, res)=>{
    
    const userStocks = await readUserStocks(req.params.username);
    res.json(userStocks);

})
router.get('/api/stocks', async (req, res) => {
    const stocks = await readStocks();

    res.json(stocks);
});
router.get('/api/stocks/:name', async (req, res) => {
    
    const stock = await readStock(req.params.name);
    res.json(stock);
})

router.post('/api/stocks', async (req, res) => {
    let result = {};
    try{
        const reqJson = req.body;
        await createStock(reqJson.name, reqJson.price, reqJson.volatility, reqJson.upside);
        result.success = true;
        result.body = reqJson;
    }catch(e){
        console.log(`There was an error ${e}`);
        result.success = false;
    }finally{
        res.json(result);
    }
});

router.delete('/api/stocks', async (req, res) => {
    let result = {};
    try{
        const reqJson = req.body;
        await deleteStock(reqJson.name);
        result.success = true;
        result.body = reqJson;
    }catch(e){
        console.log(`There was an error ${e}`);
        result.success = false;
    }finally{
        res.json(result);
    }
});

router.put('/api/stocks/:name', async (req, res) => {
    let result = {};
    try{
        const reqJson = req.body;
        await updateStock(reqJson.name, reqJson.price);
        result.success = true;
        result.body = reqJson;
    }catch(e){
        return result.success = false;
    }finally{
        res.json(result);
    }
})

async function readUserStocks(username){
    try{
        const results = await client.query("select name, price_bought_at, price_now, amount " +
        "from owns where username IN (select username from users where username = $1) order by name", [username]);
        return results.rows;
    }catch(e){
        return {msg: `There was an error ${e}`};
    }
}
async function readStocks(){
    try{
        const results = await client.query("select * from stocks");
        return results.rows;
    }catch(e){
        return {msg: `There was an error ${e}`};
    }
}
async function readStock(name){
    try{
        const results = await client.query(`select * from stocks where name LIKE '%${name}%'`);
        return results.rows;
    }catch(e){
        return {msg: `There was an error ${e}`};
    }
}

async function createStock(name, price, volatility, upside){
    try{
        await client.query("insert into stocks (name, price, volatility, upside) values ($1, $2, $3, $4)", 
        [name, price, volatility, upside]);
        return true;
    }catch(e){
        return false;
    }
}

async function deleteStock(name){
    try{
        await client.query("delete from stocks where name = $1", [name]);
        return true;
    }catch(e){
        return false;
    }
}

async function updateStock(name, price){
    try{
        await client.query("update stocks set price = $1 where name = $2", [price, name]);
        return true;
    }catch(e){
        return false;
    }
}

module.exports = router;


