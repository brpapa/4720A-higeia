const mysql = require('mysql')
const config = require('./config')

// conecta com o banco
const db = mysql.createConnection(config.db)

// todos os métodos invocados são enfileirados e executados em sequência
db.connect((err) => {
  if (err) {
    console.error('Can\'t connect to database')
    process.exit()
  }
  console.log('Sucessfull connection with database')
})

process.on('exit', () => {
  db.end()
})

module.exports = db
