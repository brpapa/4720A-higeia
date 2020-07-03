module.exports = (err) => {
  const { sqlMessage: sqlError, sql: sqlQuery } = err
  console.error({ sqlError, sqlQuery })
}
