import express from 'express'

import { getTablesAndColumns } from '../controllers/tablesAndColums.js'

const router = express.Router()

router.get('/', getTablesAndColumns)

export default router
