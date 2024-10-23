import express from 'express'

import { validateCommittee, validateUpdateCommittee, recordCounter, findWorker, workerExist } from '../middlewares/committeeMiddleware.js'
import { handleValidationErrors } from '../middlewares/validation.js'

import { getAllCommittee , getCommittee, createCommittee, deleteCommittee, updateCommittee } from '../controllers/committeeController.js'

const router = express.Router()

router.get('/', recordCounter, getAllCommittee)
router.get('/:id', findWorker('find'), getCommittee)
router.post('/', validateCommittee, handleValidationErrors, workerExist, createCommittee)
router.delete('/:id', findWorker('delete'), deleteCommittee)
router.put('/:id', validateUpdateCommittee, handleValidationErrors, findWorker('find'), updateCommittee)


export default router
