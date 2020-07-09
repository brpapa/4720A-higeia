const db = require('./../db')
const handleError = require('./../utils/handleQueryError')
const user = require('./../models/user')

module.exports = {
  who: (req, res) => {
    const { id } = req.params

    db.query('SELECT * FROM patient WHERE id=?', [id], (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res
        .status(202)
        .json({ user: results.length === 1 ? 'patient' : 'doctor' })
    })
  },
  delete: (req, res) => {
    const { id } = req.params

    db.query(`DELETE FROM ${user.table} WHERE id=?`, [id], (err) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.sendStatus(200)
    })
  },
}
