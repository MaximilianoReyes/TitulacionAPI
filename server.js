import express from 'express'

import studentRoutes from './routes/studentRoutes.js'
import committeeRoutes from './routes/committeeRoutes.js'
import sinodalstRoutes from './routes/sinodalstRoutes.js'
import modalitiesRoutes from './routes/modalitiesRoutes.js'
import tablesAndColums from './routes/tablesAndColumsRoute.js'

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('/students', studentRoutes)
app.use('/committees', committeeRoutes)
app.use('/sinodalst', sinodalstRoutes)
app.use('/modalities', modalitiesRoutes)
app.use('/tables-columns', tablesAndColums)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})
