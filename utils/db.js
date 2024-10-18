import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Client } = pkg

const connectionData = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

connectionData.connect()
    .then(() => console.log('Base de datos conectada'))
    .catch(e => console.log('Error al conectar a la base de datos', e))

export default connectionData
