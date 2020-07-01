require('dotenv').config({ silent: true })

module.exports = {
  server: {
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
}
