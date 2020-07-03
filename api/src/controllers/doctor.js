const db = require('../db')
const handleError = require('../utils/handleQueryError')
const user = require('../models/user')
const doctor = require('../models/doctor')
const location = require('../models/location')
const specialization = require('../models/specialization')

const selectDoctors = `
SELECT ${user.attrs.slice(2)
  .concat(doctor.attrs.slice(3))
  .concat(specialization.attrs.slice(1).map((attr) => `${attr} as specialization_${attr}`))
  .concat(location.attrs.slice(1).map((attr) => `${attr} as medical_care_location_${attr}`))
  .join(',')}
FROM ${user.table}
  INNER JOIN ${doctor.table}
  USING (id)
  INNER JOIN ${specialization.table}
  ON ${doctor.table}.specialization_id = ${specialization.table}.id
  INNER JOIN ${location.table}
  ON ${doctor.table}.medical_care_location_id = ${location.table}.id
` // prettier-ignore

module.exports = {
  index: (_, res) => {
    // const {} = req.query

    db.query(selectDoctors, (err, results) => {
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
      `${selectDoctors} WHERE ${user.table}.id=?`,
      [id],
      (err, [result]) => {
        if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore
        if (!result) return res.sendStatus(404)

        return res.status(200).json(result)
      }
    )
  },
  update: (req, res) => {
    return res.json({})
  },
  delete: (req, res) => {
    return res.json({})
  },
}
