const db = require('../db')
const handleError = require('../utils/handleQueryError')
const presc = require('../models/prescription')
const appt = require('../models/appointment')
const medicine = require('../models/medicine')

const createSelectPrescs = (user) => `
SELECT ${presc.attrs
  .filter((attr) => attr !== 'id' && !attr.includes('id'))
  .concat(
    appt.attrs
      .filter((attr) =>
        ['id', 'doctor_id', 'patient_id'].some((v) => v === attr)
      )
      .map((attr) => `${appt.table}.${attr} AS appt_${attr}`)
  )
  .concat(
    medicine.attrs
      .filter((attr) => !attr.includes('id'))
      .map((attr) => `${medicine.table}.${attr} AS medicine_${attr}`)
  )
  .join(',')}
FROM ${presc.table}
  INNER JOIN ${appt.table}
  ON ${presc.table}.appt_id = ${appt.table}.id
  INNER JOIN ${medicine.table}
  ON ${presc.table}.medicine_id = ${medicine.table}.id
WHERE
  ${appt.table}.${user}_id = ?
`

const insertPresc = `
INSERT INTO ${presc.table}(appt_id,medicine_id,start_date,expiration_date,dose,dose_unit,frequency,frequency_per)
VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`

module.exports = {
  show: (req, res) => {
    const { user, id } = req.params
    if (!user || !id) return res.status(400)

    db.query(createSelectPrescs(user), id, (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.status(200).json(
        results.map((result) => ({
          ...result,
          start_date: result.start_date.toISOString().slice(0, 10), // FIXME: cuidado, result.date está com 3 horas a mais em relação ao armazenado no bd, mas nesse caso não tem problema
          expiration_date: result.expiration_date.toISOString().slice(0, 10), // FIXME: cuidado, result.date está com 3 horas a mais em relação ao armazenado no bd, mas nesse caso não tem problema
        }))
      )
    })
  },
  store: (req, res) => {
    const {
      appt_id,
      medicine_id,
      start_date,
      expiration_date,
      dose,
      dose_unit,
      frequency,
      frequency_per
    } = req.body

    const values = [
      appt_id,
      medicine_id,
      start_date,
      expiration_date,
      dose,
      dose_unit,
      frequency,
      frequency_per,
    ]

    if (values.some((v) => !v)) return res.sendStatus(400)

    db.query(insertPresc, values, (err) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.sendStatus(201)
    })
  },
}
