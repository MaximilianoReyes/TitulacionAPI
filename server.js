import express from 'express'

import studentRoutes from './routes/studentRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/students', studentRoutes)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})