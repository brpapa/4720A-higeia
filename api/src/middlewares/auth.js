const db = require('../db')
const handleError = require('../utils/handleQueryError')

// verifica se a requisição veio com um header Authorization válido
module.exports = async (req, res, next) => {
  const header = req.header('Authorization')
  if (!header) return res.sendStatus(401)
  
  // HTTP Basic Auth
  const encoded = header.replace('Basic ', '')
  const decoded = Buffer.from(encoded, 'base64').toString('ascii')
  const [username, password] = decoded.split(':')

  db.query(
    'SELECT * FROM user WHERE id=? AND password=?',
    [username, password],
    (err, results) => {
      if (err) {
        handleError(err)
        return res.sendStatus(500)
      }

      if (results.length === 1) next()
      else return res.sendStatus(401)
    }
  )
}
