const mysql = require('mysql')

const settings = require('./settings')

// auth error? rode no mysql -> ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
const db = mysql.createConnection(settings.db)

db.connect((error) => {
  if (error) throw error
  console.log('Sucessfull connection with database')

  db.query('show databases', (err, result) => {
    if (err) throw err

    for (const t of result) console.log(t)
  })
})
