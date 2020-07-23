const db = require('../db')
const handleError = require('../utils/handleQueryError')
const user = require('../models/user')
const doctor = require('../models/doctor')
const spec = require('../models/doctor-specialization')
const mcl = require('../models/doctor-medical-care-location')
const address = require('../models/address')
const appt = require('../models/appointment')
const woh = require('../models/doctor-week-opening-hour')

module.exports = {
  index: (_, res) => {
    db.query(selectDoctors, (err, results) => {
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
      `${selectDoctors} WHERE ${user.table}.id=?`,
      [id],
      (err, [result]) => {
        if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore
        if (!result) return res.sendStatus(404)

        return res.status(200).json(result)
      }
    )
  },
  showOpeningHours: (req, res) => {
    const { id } = req.params
    const { date } = req.query

    db.query(selectOpeningHours, [id, date, id, date], (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.json(results.map((result) => result.hour))
    })
  },
  // TODO
  update: (req, res) => {
    return res.json({})
  },
  // TODO
  delete: (req, res) => {
    return res.json({})
  },
}

const selectDoctors = `
SELECT ${user.attrs
  .filter((attr) => attr !== 'password')
  .map((attr) => `${user.table}.${attr}`)
  .concat(
    doctor.attrs
      .filter((attr) => !attr.includes('id'))
      .map((attr) => `${doctor.table}.${attr}`)
  )
  .concat(
    spec.attrs
      .filter((attr) => !attr.includes('id'))
      .map((attr) => `${spec.table}.${attr} AS specialization_${attr}`)
  )
  .concat(
    mcl.attrs
      .filter((attr) => !attr.includes('id'))
      .map((attr) => `${mcl.table}.${attr} AS medical_care_location_${attr}`)
  )
  .concat(
    address.attrs
      .filter((attr) => !attr.includes('id'))
      .map(
        (attr) =>
          `${address.table}.${attr} AS medical_care_location_address_${attr}`
      )
  )
  .join(',')}
FROM ${user.table}
  INNER JOIN ${doctor.table}
  USING (id)
  INNER JOIN ${spec.table}
  ON ${doctor.table}.specialization_id = ${spec.table}.id
  INNER JOIN ${mcl.table}
  ON ${doctor.table}.medical_care_location_id = ${mcl.table}.id
  INNER JOIN ${address.table}
  ON ${mcl.table}.address_id = ${address.table}.id
`

const selectOpeningHours = `
SELECT hour
FROM ${woh.table}
WHERE
  doctor_id=? AND
  weekday=DAYNAME(?) AND
  hour NOT IN (
    SELECT start_time
    FROM ${appt.table}
    WHERE doctor_id=? AND date=? AND status!='cancelled'
  )
`
