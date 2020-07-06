const db = require('./../db')
const handleError = require('./../utils/handleQueryError')

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
}
