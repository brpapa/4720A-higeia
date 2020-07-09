const db = require('../db')
const handleError = require('../utils/handleQueryError')
// const user = require('../models/user')
// const doctor = require('../models/doctor')
// const location = require('../models/location')
// const specialization = require('../models/doctor-specialization')
const appt = require('../models/appointment')

module.exports = {
  show: (req, res) => {
    const { status, user, id } = req.params

    db.query(createSelectAppts(user), [id, status], (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.status(200).json(
        results.map((result) => ({
          ...result,
          date: result.date.toISOString().slice(0, 10), // FIXME: cuidado, result.date está com 3 horas a mais em relação ao armazenado no bd, mas nesse caso não tem problema
        }))
      )
    })
  },
  store: (req, res) => {
    const { date, start_time, patient_id, doctor_id, status } = req.body
    if ([date, start_time, patient_id, doctor_id, status].some((v) => !v))
      return res.sendStatus(400)

    db.query(
      insertAppt,
      [date, start_time, doctor_id, patient_id, status],
      (err) => {
        if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

        return res.sendStatus(201)
      }
    )
  },
  update: (req, res) => {
    const { id } = req.params
    const { status, doctor_diagnosis, doctor_notes, rating } = req.body
    if (!id) return res.sendStatus(400)

    const fields = [
      { name: 'status', value: status },
      { name: 'doctor_diagnosis', value: doctor_diagnosis },
      { name: 'doctor_notes', value: doctor_notes },
      { name: 'rating', value: rating },
    ].filter((v) => v.value)

    if (fields.length === 0) return res.sendStatus(200)

    db.query(createUpdateAppt(fields), [id], (err) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.sendStatus(200)
    })
  },
}

const createSelectAppts = (user) => `
SELECT ${appt.attrs.filter((attr) => attr !== `${user}_id`).join(',')}
FROM ${appt.table}
WHERE ${user}_id = ? AND status = ?
ORDER BY date, start_time
`

const insertAppt = `
INSERT INTO ${appt.table}(date, start_time, doctor_id, patient_id, status)
VALUES (?, ?, ?, ?, ?)
`

const createUpdateAppt = (fields) => `
UPDATE ${appt.table}
SET ${fields
  .map(
    (field) =>
      `${field.name}=${
        typeof field.value === 'number' ? field.value : "'" + field.value + "'"
      }`
  )
  .join(',')}
WHERE id=?
`
