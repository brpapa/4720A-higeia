require('dotenv').config({ silent: true })

const port = Number(process.env.PORT) || 3000
const env = String(process.env.NODE_ENV) || 'development'

const db_by_env = {
  development: {
    host: String(process.env.DB_HOST || 'localhost'),
    port: Number(process.env.DB_PORT) || 3306,
    user: String(process.env.DB_USER),
    password: String(process.env.DB_PASSWORD),
    database: String(process.env.DB_NAME),
  },
  production: {},
}

module.exports = {
  env,
  port,
  db: db_by_env[env],
}
