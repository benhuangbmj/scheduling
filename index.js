require('dotenv').config();
const mariadb = require('mariadb');
const express = require('express');
const app = express();

async function testDB(pool) {
  let conn;
  try {
	conn = await pool.getConnection();
	const allUsers = await conn.query("SELECT user as myUser, host as myHost FROM mysql.user");
	console.log(allUsers);
	const currUser = await conn.query("SELECT user() AS currUser");
	console.log(currUser);

  } catch (err) {
	throw err;
  } finally {
	if (conn) return conn.end();
  }
};

const pool = mariadb.createPool({
    host: 'localhost',
    user: process.env.databaseUser,
    password: process.env.databasePW,
    connectionLimit: 5
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})

app.get('/api', (req, res) => {
    res.json({message: 'Hello World!'});
})


