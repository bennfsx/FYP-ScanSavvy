const functions = require('@google-cloud/functions-framework');
const createUnixSocketPool = require('./connect-unix.js');
const crypto = require("crypto");
const mysql = require('promise-mysql');
const fs = require('fs');
const token = process.env.TELEGRAM_TOKEN
const chat_id = String(process.env.CHAT_ID)
const base_url = "https://api.telegram.org/bot" + token

function debug(message){
    var url = base_url + "/sendMessage?text=" + message + "&chat_id=" + chat_id
	fetch(url);
}

const createPool = async () => {
  const config = {
    connectionLimit: 5,
    connectTimeout: 10000, // 10 seconds
    acquireTimeout: 10000, // 10 seconds
    waitForConnections: true, // Default: true
    queueLimit: 0, // Default: 0
  };
  return createUnixSocketPool(config)
};

const ensureSchema = async pool => {
  // Wait for tables to be created (if they don't already exist).  
  await pool.query(
    `CREATE TABLE IF NOT EXISTS events
      ( 
      eventID INTEGER AUTO_INCREMENT,
	  eventName VARCHAR(100) UNIQUE,
	  eventDescription VARCHAR(100),
      datetime12h DATETIME,
      eventSeat VARCHAR(100),
      launchDate DATE,
      eventVenue VARCHAR(100),
      city VARCHAR(100),
      state VARCHAR(100),
      eventAddress VARCHAR(1000),
      postalCode VARCHAR(20),
      PRIMARY KEY (eventID) 
	);`
  );
  await pool.query(
	`CREATE TABLE IF NOT EXISTS scans (
		scanID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
		scanCodeHash TINYTEXT,
		scanUserID TEXT,
		scanDateTime DATETIME
	);`
  );
  await pool.query(
	` CREATE TABLE IF NOT EXISTS codes (
		codeHash varchar(32) NOT NULL PRIMARY KEY,
		codeName TINYTEXT,
		codeDesc TEXT,
		codeURL TEXT,
		codeType ENUM("Authentication", "Redirection", "Transaction") NOT NULL,
		codeValue DECIMAL(10,2) DEFAULT 0
	);`
  );
};

const createPoolAndEnsureSchema = async () =>
  await createPool()
    .then(async pool => {
      await ensureSchema(pool);
      return pool;
    })
    .catch(err => {
      throw err;
    });

// Set up a variable to hold our connection pool. It would be safe to
// initialize this right away, but we defer its instantiation to ease
// testing different configurations.
let pool;

functions.http('helloHttp', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', '*');
  res.set('Access-Control-Allow-Methods', '*');
  if(req.method == "OPTIONS"){
    res.status(200).send()
	return
  }
  param = req.params[0].toLowerCase()
  if(param == "register"){
    insertToSQL(res, 'users', req.body)
  }
  else if(param == "checkusers"){
    getFromSQL(res, 'users', req.body)
  }
  else if(param == "deleteuser"){
    deleteFromSQL(res, 'users', req.body)
  }
  else if(param == "updateuser"){
    updateSQL(res, 'users', req.body)
  }
  else if(param == "createcode"){
	body = req.body
	body.codeHash = crypto.randomBytes(16).toString('hex')
    insertToSQL(res, 'codes', req.body)
  }
  else if(param == "checkevents"){
    getFromSQL(res, 'events', req.body)
  }
  else if(param == "updateevent"){
    updateSQL(res, 'events', req.body)
  }
  else if(param == "deleteevent"){
    deleteFromSQL(res, 'events', req.body)
  }
  else if(param.startsWith("checkin")){
    checkin(res, param.split('/')[1])
  }
  else if(param == "drop"){
    drop(res, req.body)
  }
  else if(param == "initialize"){
    initialize(res)
  }
  else{
	  res.send("API is running")
  }
});
async function drop(res, body){
	pool = pool || (await createPoolAndEnsureSchema());
	debug("Dropping table : " + body[0])
	await pool.query('DROP TABLE ' + body[0])
	res.send()
}

async function checkin(res, eventID){
	pool = pool || (await createPoolAndEnsureSchema());
	debug("Checking in : " + eventID)
	query = 'SELECT * FROM events where eventID = ' + eventID
	response = await pool.query(query)
	if (response.length == 0){
		res.status(404).send()
	}else{
		res.send(response);
	}
	res.send()
}

async function initialize(res){
	pool = pool || (await createPoolAndEnsureSchema());
	debug("Initializing")
	await ensureSchema()
	res.send()
}

async function getFromSQL(res, tableName, body){
	pool = pool || (await createPoolAndEnsureSchema());
	conditions = '';
	if (body){
		Object.keys(body).forEach(function(key) {
			if (conditions == ''){
				conditions = ' WHERE '
				conditions += key + ' = \'' + body[key] + '\'' 
			}else{
				conditions += ' AND ' + key + ' = \'' + body[key] + '\'' 
			}
		})	  
	}
	query = 'SELECT * FROM ' + tableName + conditions
	debug("Function getFromSQL ran with the following query:%0A%0A" + query)
	response = await pool.query(query)
	if (response.length == 0){
		res.status(404).send()
	}else{
		res.send(response);
	}
}

async function updateSQL(res, tableName, body){
	pool = pool || (await createPoolAndEnsureSchema());
	conditions = '';
	if (body){
		Object.keys(body).forEach(function(key) {
			if (conditions == ''){
				conditions = ' SET '
				conditions += key + ' = \'' + body[key] + '\'' 
			}else{
				conditions += ' AND ' + key + ' = \'' + body[key] + '\'' 
			}
		})	  
	}
	query = 'UPDATE ' + tableName + conditions + ' WHERE ' + body['id'][0].key + ' = ' + body['id'][0][body['id'][0].key]
	debug("Function updateSQL ran with the following query:%0A%0A" + query)
	response = await pool.query(query)
	if (response.length == 0){
		res.status(404).send()
	}else{
		res.send(response);
	}
}

async function deleteFromSQL(res, tableName, body){
	pool = pool || (await createPoolAndEnsureSchema());
	conditions = '';
	if (body){
		Object.keys(body).forEach(function(key) {
			if (conditions == ''){
				conditions = ' WHERE '
				conditions += key + ' = \'' + body[key] + '\'' 
			}else{
				conditions += ' AND ' + key + ' = \'' + body[key] + '\'' 
			}
		})	  
	}
	query = 'DELETE FROM ' + tableName + conditions
	debug("Function deleteFromSQL ran with the following query:%0A%0A" + query)
	response = await pool.query(query)
	if (response.length == 0){
		res.status(404).send()
	}else{
		res.send(response);
	}
}

async function insertToSQL(res, tableName, body) {
	console.log(body)
	pool = pool || (await createPoolAndEnsureSchema());  
	keys = []
	values = []
	Object.keys(body).forEach(function(key) {
		keys.push(key)
		values.push(body[key])
	})
	query = 'INSERT INTO ' + tableName + ' (' + keys.join(',') + ') VALUES (\'' + values.join('\',\'') + '\')'
	debug("Function insertToSQL ran with the following query:%0A%0A" + query)
	try{
		res.send(await pool.query(query));
	}catch(err){
		if (err.errno === 1062) {
			res.status(409).send(err.sqlMessage);
		}
		else{
			res.status(400).send(err)
		}
	}
}