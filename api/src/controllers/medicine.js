const db = require('../db')
const handleError = require('../utils/handleQueryError')
const medicine = require('../models/medicine')

const selectMedicines = `
SELECT ${medicine.attrs
  .map((attr) => `${medicine.table}.${attr}`)
  .join(',')}
FROM ${medicine.table}
`

module.exports = {
  index: (_, res) => {
    db.query(selectMedicines, (err, results) => {
      if (err) { handleError(err); return res.sendStatus(500) } // prettier-ignore

      return res.status(200).json(results)
    })
  },
}
