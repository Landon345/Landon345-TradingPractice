// const {Client} = require('pg');
const express = require('express');
const app = express();

// const client = new Client({
//     user: 'postgres',
//     password: 'CS366',
//     host: 'localhost',
//     port: 5432,
//     database: 'tradingpractice'
// });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//users register and login
app.use('/', require('./users'));
app.use('/', require('./stocks'));
app.use('/', require('./owns'));


//get all the data
// app.get('/api/users', async (req, res)=>{
//     const users = await readUsers();
//     res.json(users);
// });
// app.get('/api/users/:username', async (req, res) => {
//     const user = await readUser(req.params.username);
//     res.json(user);
// })
// app.get('/api/user/loggedin', async (req, res) => {
//     const user = await readUserLoggedin();
//     res.json(user);
// })
// app.get('/api/stocks/:username', async (req, res)=>{
    
//     const userStocks = await readUserStocks(req.params.username);
//     res.json(userStocks);

// })
// app.get('/api/stocks', async (req, res) => {
//     const stocks = await readStocks();
//     res.json(stocks);
// });
// app.get('/api/owns', async (req, res) => {
//     const owns = await readOwns();
//     res.json(owns);
// })


//post and delete users, stocks, and owns data.
//post users
// app.post('/api/users', async (req, res) => {
//     let result = {};
//     try{
//         const reqJson = req.body;
//         console.log(reqJson);
//         await createUser(reqJson.username, reqJson.password, reqJson.money, reqJson.premium_user, reqJson.loggedin);
//         result.success = true;
//         result.body = reqJson;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// });
//post stocks
// app.post('/api/stocks', async (req, res) => {
//     let result = {};
//     try{
//         const reqJson = req.body;
//         await createStock(reqJson.name, reqJson.price, reqJson.volatility, reqJson.upside);
//         result.success = true;
//         result.body = reqJson;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// });

// post Owns
// app.post('/api/owns', async (req, res)=>{
//     let result = {};
//     try{
//         const reqJson = req.body;
//         await createOwn(reqJson.username, reqJson.name, reqJson.price_bought_at, reqJson.price_now, reqJson.amount);
//         result.success = true;
//         result.body = reqJson;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// })
//delete user
// app.delete('/api/users', async (req, res) => {
//     let result = {};
//     try{
//         const reqJson = req.body;
//         await deleteUser(reqJson.username);
//         result.success = true;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// })
//delete stock
// app.delete('/api/stocks', async (req, res) => {
//     let result = {};
//     try{
//         const reqJson = req.body;
//         await deleteStock(reqJson.name);
//         result.success = true;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// });
//delete owns
// app.delete('/api/owns', async (req, res) => {
//     let result = {};
//     try{
//         const reqJson = req.body;
//         await deleteOwn(reqJson.username, reqJson.name);
//         result.success = true;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// })

//update user
// app.put('/api/users/:username', async (req, res) => {
//     let result = {};
//     try{
       
//         const reqJson = req.body;
//         console.log(reqJson);
//         const worked = await updateUser(reqJson.username, reqJson.password, reqJson.dollars, reqJson.premium_user, reqJson.loggedin);
//         result.success = worked;
//         result.body = reqJson;
//     }catch(e){
//         console.log(`There was an error ${e}`);
//         result.success = false;
//     }finally{
//         res.json(result);
//     }
// });
app.listen(5000, ()=>console.log('listening on port 5000....'));

//connect to the database
// execute();
// async function execute(){
//     await connect();
// }
// async function connect(){
//     try{
//         await client.connect();
//         console.log(`Connected`);
//     }catch(e){
//         console.error(`connection failed ${e}`);
//     }
// }

//reading users, stocks, and owns.
// async function readUsers(){
//     try{
//         const results = await client.query("select * from users");
//         //const results = await client.query("select users.username, users.dollars, users.premium_user, owns.name, owns.amount FROM users INNER JOIN owns ON users.username = owns.username");
//         //select users.username, users.dollars, users.premium_user, owns.name, owns.amount FROM users INNER JOIN owns ON users.username = owns.username
//         return results.rows;
//     }catch(e){
//         return [];
//     }
// }
// //gets the specific user
// async function readUser(username){
//     try{
//         const results = await client.query("select * from users where username = $1", [username]);
//         return results.rows;
//     }catch(e){
//         return [];
//     }
// }
// //gets the user that is logged in
// async function readUserLoggedin(){
//     try{
//         const results = await client.query("select * from users where loggedin = true");
//         return results.rows;
//     }catch(e){
//         return [];
//     }
// }
//gets all the stocks that this specific user holds. 
// async function readUserStocks(username){
//     try{
//         const results = await client.query("select name, price_bought_at, price_now, amount from owns where username IN (select username from users where username = $1)", [username]);
//         return results.rows;
//     }catch(e){
//         return [];
//     }
// }
// async function readStocks(){
//     try{
//         const results = await client.query("select * from stocks");
//         return results.rows;
//     }catch(e){
//         return [];
//     }
// }
// async function readOwns(){
//     try{
//         const results = await client.query("select * from owns");
//         return results.rows;
//     }catch(e){
//         return [];
//     }
// }

//creating user, stock, and own.
// async function createUser(username, password, dollars, premium_user, loggedin){
//     try{
//         await client.query("insert into users (username, password, dollars, premium_user, loggedin) values ($1, $2, $3, $4, $5)",
//          [username, password, dollars, premium_user, loggedin]);
//         return true;
//     }catch(e){
//         return false;
//     }
// }
// async function createStock(name, price, volatility, upside){
//     try{
//         await client.query("insert into stocks (name, price, volatility, upside) values ($1, $2, $3, $4)", 
//         [name, price, volatility, upside]);
//         return true;
//     }catch(e){
//         return false;
//     }
// }
// async function createOwn(username, name, price_bought_at, price_now, amount){
//     try{
//         await client.query("insert into owns (username, name, price_bought_at, price_now, amount) values ($1, $2, $3, $4, $5)",
//          [username, name, price_bought_at, price_now, amount]);
//         return true;
//     }catch(e){
//         return false;
//     }
// }
//deleting user, stock, and own
// async function deleteUser(username){
//     try{
//         await client.query("delete from users where username = $1", [username]);
//         return true;
//     }catch(e){
//         return false;
//     }
// }
// async function deleteStock(name){
//     try{
//         await client.query("delete from stocks where name = $1", [name]);
//         return true;
//     }catch(e){
//         return false;
//     }
// }
// async function deleteOwn(username, name){
//     try{
//         await client.query("delete from owns where username = $1 and name = $2", [username, name]);
//         return true;
//     }catch(e){
//         return false;
//     }
// }

// async function updateUser(username, password, dollars, premium_user, loggedin){
//     try{
//         console.log(username, password, dollars, premium_user, loggedin );
//         //await client.query("update users set loggedin = false");
//         await client.query("update users set loggedin = $1 where username = $2",
//         [loggedin, username]);
//         console.log(username, password, dollars, premium_user, loggedin );
//         return true;
//     }catch(e){
//         console.log(`Error: ${e}`);
//         return false;
//     }
// }



