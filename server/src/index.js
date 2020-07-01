const express = require('express')

const routes = require('./config/routes')
const { server: { port } } = require('./config/settings')
const db = require('./config/db-connection')

express()
  // .use(cors())
  .use(express.json()) // entende req.body como json
  .use(routes)
  .listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
