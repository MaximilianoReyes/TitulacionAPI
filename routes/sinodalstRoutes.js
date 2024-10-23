import express from 'express'

import { validateSinodalst, validateUpdateSinodalst, recordCounter, findWorkerSinodalst, workerExistSinodalst } from '../middlewares/sinodalstMiddleware.js'
import { handleValidationErrors } from '../middlewares/validation.js'

import { getAllSinodalst, getSinodalst, createSinodalst, deleteSinodalst, updateSinodalst } from '../controllers/sinodalstController.js'


const router = express.Router()

router.get('/', recordCounter, getAllSinodalst)
router.get('/:id', findWorkerSinodalst('find'), getSinodalst)
router.post('/', validateSinodalst, handleValidationErrors, workerExistSinodalst, createSinodalst)
router.delete('/:id', findWorkerSinodalst('delete'), deleteSinodalst)
router.put('/:id', validateUpdateSinodalst, handleValidationErrors, findWorkerSinodalst('find'), updateSinodalst)

export default router