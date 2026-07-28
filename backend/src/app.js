const cors = require('cors')
const express = require('express')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API TP Integrador PWA' })
})

app.use('/productos', productRoutes)
app.use('/categorias', categoryRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)

  const statusCode = err.statusCode || 500
  const message = statusCode === 500 ? 'Error interno del servidor' : err.message

  res.status(statusCode).json({ message })
})

module.exports = app
