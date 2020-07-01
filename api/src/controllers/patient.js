const db = require('../db')

// TODO
module.exports = {
  index: async (req, res) => {
    const {} = req.query

    db.query('select * from patient', (err, result) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(result)
    })
  },
  store: (req, res) => {
    return res.status(201).json({})
  },
  show: (req, res) => {
    const { email } = req.params

    db.query('select * from patient where email=?', [email], (err, result) => {
      if (err) return res.status(500).json(err)

      return res.status(200).json(result)
    })
  },
  update: (req, res) => {
    return res.json({})
  },
  delete: (req, res) => {
    return res.json({})
  },
}
