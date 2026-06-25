const cors = require('cors')
const express = require('express')
const productRoutes = require('./routes/productRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'API TP Integrador PWA' })
})

app.use('/productos', productRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' })
})

app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ message: 'Error interno del servidor' })
})

module.exports = app
