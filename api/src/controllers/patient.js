const db = require('../db')
const handleError = require('../utils/handleQueryError')
const user = require('../models/user')
const patient = require('../models/patient')
const address = require('../models/address')

const selectPatients = `
SELECT ${
  user.attrs.filter(attr => attr !== 'password').map(attr => `${user.table}.${attr}`)
  .concat(patient.attrs.filter(attr => !attr.includes('id')))
  .concat(address.attrs.filter(attr => !attr.includes('id')).map((attr) => `${attr} as address_${attr}`))
  .join(',')
}
FROM ${user.table}
  INNER JOIN ${patient.table}
  USING (id)
  INNER JOIN ${address.table}
  ON ${patient.table}.address_id = ${address.table}.id
` // prettier-ignore

module.exports = {
  index: (_, res) => {
    // const {} = req.query

    db.query(selectPatients, (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.status(200).json(results)
    })
  },
  // TODO
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
  // TODO
  update: () => { },
  // TODO
  delete: () => {},
}
