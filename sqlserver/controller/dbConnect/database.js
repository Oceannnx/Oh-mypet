const mysql = require('mysql2')

require('dotenv').config()

const dbConnect = () => {
  const db = mysql
    .createConnection({
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise()

  return db
}

module.exports = { dbConnect }
