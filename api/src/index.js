const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const routes = require('./routes')
const { env, port } = require('./config')

express()
  // middlewares
  .use(helmet()) // garante segurança
  .use(cors()) // permite requisição de todos cors
  .use(express.json()) // entende req.body como json
  .use(morgan(env === 'development' ? 'dev' : 'combined')) // log http requests

  // rotas
  .use(routes)

  .listen(port, () => console.log(`Server is running on port ${port}`))
