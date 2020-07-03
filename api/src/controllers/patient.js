const db = require('../db')
const handleError = require('../utils/handleQueryError')
const user = require('../models/user')
const patient = require('../models/patient')
const location = require('../models/location')

const selectPatients = `
SELECT ${user.attrs.slice(2)
  .concat(patient.attrs.slice(2))
  .concat(location.attrs.slice(1).map((attr) => `${attr} as address_${attr}`))
  .join(',')}
FROM ${user.table}
  INNER JOIN ${patient.table}
  USING (id)
  INNER JOIN ${location.table}
  ON ${patient.table}.address_id = ${location.table}.id
` // prettier-ignore

module.exports = {
  index: (_, res) => {
    // const {} = req.query

    db.query(selectPatients, (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.status(200).json(results)
    })
  },
  store: (req, res) => {
    return res.sendStatus(201)
  },
  show: (req, res) => {
    const { id } = req.params

    db.query(
      `${selectPatients} WHERE ${user.table}.id=?`,
      [id],
      (err, [result]) => {
        if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore
        if (!result) return res.sendStatus(404)

        return res.status(200).json(result)
      }
    )
  },
  update: () => {},
  delete: () => {},
}
