const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
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
        console.log(`Connected`);
    }catch(e){
        console.error(`connection failed ${e}`);
    }
}

//gets users different ways
router.get('/api/users', async (req, res) => {
  const users = await readUsers();
  res.json(users);
});

router.get('/api/users/:myusername', async (req, res) => {
  const user = await readUserNoPassword(req.params.myusername);
  res.json(user);
});
router.get('/api/users/:username/:password', async (req, res) => {
    const user = await readUser(req.params.username, req.params.password);
    res.json(user);
});

router.get('/api/user/loggedin', async (req, res) => {
  const user = await readUserLoggedin();
  res.json(user);
});

//post users
router.post('/api/users', async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    
    console.log(reqJson);
    if(reqJson.username == ""){
      result.success = false;
      result.msg = "You are not allowed to have an empty username."
    }else{
      
      const worked = await createUser(
      reqJson.username,
      reqJson.password,
      reqJson.dollars,
      reqJson.premium_user,
      reqJson.loggedin
      );
      if(!worked){
        result.msg = "Username already taken."
      }
      result.success = worked;
    }
    
    result.body = reqJson;
  } catch (e) {
    console.log(`There was an error ${e}`);
    result.success = false;
  } finally {
    res.json(result);
  }
});

//delete user
router.delete('/api/users', async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    await deleteUser(reqJson.username);
    result.success = true;
  } catch (e) {
    console.log(`There was an error ${e}`);
    result.success = false;
  } finally {
    res.json(result);
  }
});

//update user
router.put('/api/users/:username', async (req, res) => {
  let result = {};
  try {
    const reqJson = req.body;
    console.log(reqJson);
    const worked = await updateUser(
      reqJson.username,
      reqJson.dollars,
      reqJson.premium_user,
    );
    result.success = worked;
    result.body = reqJson;
  } catch (e) {
    console.log(`There was an error ${e}`);
    result.success = false;
  } finally {
    res.json(result);
  }
});

//reading users
async function readUsers() {
  try {
    const results = await client.query('select * from users');
    //const results = await client.query("select users.username, users.dollars, users.premium_user, owns.name, owns.amount FROM users INNER JOIN owns ON users.username = owns.username");
    //select users.username, users.dollars, users.premium_user, owns.name, owns.amount FROM users INNER JOIN owns ON users.username = owns.username
    return results.rows;
  } catch (e) {
    return {msg: `There has been an error ${e}`};
  }
}
//gets the specific user
async function readUser(username, password) {
  try {
    
    const results = await client.query(
      'select * from users where username = $1',
      [username]
    );
    const isMatch = await bcrypt.compare(password, results.rows[0].password);
    console.log(isMatch);
    if(isMatch){
      return results.rows;
    }else{
      return {msg: `Incorrect Password`};
    }
    //return results.rows;
  } catch (e) {
    return {msg: `No user with username of ${username}`};
  }
}
//gets the specific user
async function readUserNoPassword(username) {
  try {
    const results = await client.query(
      'select * from users where username = $1',
      [username]
    );
    
    return results.rows[0];
  } catch (e) {
    return {msg: `No user with username of ${username}`};
  }
}
//gets the user that is logged in
async function readUserLoggedin() {
  try {
    const results = await client.query(
      'select * from users where loggedin = true'
    );
    return results.rows;
  } catch (e) {
    return {msg: `There has been an error ${e}`};
  }
}

//creating user
async function createUser(username, password, dollars, premium_user, loggedin) {
  try {
    const results = await client.query('select username from users');
    results.rows.forEach(user => {
      if(user == username){
        return false;
      }
    })
    const saltRounds = 5;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword)
  
    await client.query(
    'insert into users (username, password, dollars, premium_user, loggedin) values ($1, $2, $3, $4, $5)',
    [username, hashPassword, dollars, premium_user, loggedin]
    );

    
    
    
    return true;
  } catch (e) {
    return false;
  }
}

//deleting user
async function deleteUser(username) {
  try {
    await client.query('delete from users where username = $1', [username]);
    return true;
  } catch (e) {
    return false;
  }
}

async function updateUser(username, dollars, premium_user) {
  try {
    console.log(username, dollars, premium_user);
    //await client.query("update users set loggedin = false");
    await client.query('update users set dollars = dollars + $1 where username = $2', [
      dollars,
      username
    ]);
    await client.query('update users set premium_user = $1 where username = $2', [
      premium_user,
      username
    ]);
    console.log(username, password, dollars, premium_user, loggedin);
    return true;
  } catch (e) {
    console.log(`Error: ${e}`);
    return false;
  }
}

module.exports = router;
