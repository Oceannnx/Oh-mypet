const mysql = require('mysql2')

require('dotenv').config()

const dbConnect = () => {
  const pool = mysql
    .createPool({
      host: process.env.DB_URL,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    })
    .promise()

  return pool
}

module.exports = { dbConnect }
