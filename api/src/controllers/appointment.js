const db = require('../db')
const handleError = require('../utils/handleQueryError')
// const user = require('../models/user')
// const doctor = require('../models/doctor')
// const location = require('../models/location')
// const specialization = require('../models/doctor-specialization')
const appt = require('../models/appointment')

const createSelectAppts = (user) => `
SELECT ${appt.attrs
  .filter((attr) => attr !== `${user}_id`)
  .join(',')}
FROM ${appt.table}
WHERE ${user}_id = ?
` // prettier-ignore

module.exports = {
  index: (req, res) => {
    const { user, id } = req.params
    const { status } = req.query

    db.query(
      `${createSelectAppts(user)} ${status ? 'AND status = ?' : ''}`,
      [id, status],
      (err, results) => {
        if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

        return res.status(200).json(results)
      }
    )
  },
  store: (req, res) => {
    const { patient_id, doctor_id } = req.body
    return res.sendStatus(201)
  },
}
