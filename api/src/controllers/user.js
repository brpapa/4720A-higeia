const db = require('./../db')

module.exports = {
  who: (req, res) => {
    const { id } = req.params

    db.query('SELECT * FROM patient WHERE id=?', [id], (err, results) => {
      if (err) return res.sendStatus(500)

      return res
        .status(202)
        .json({ user: results.length === 1 ? 'patient' : 'doctor' })
    })
  },
}
