import express from 'express'

import { validateModalities, findModalitie, recordCounter, modalityExist } from '../middlewares/modalitiesMiddleware.js'
import { handleValidationErrors } from '../middlewares/validation.js'

import { getAllModalities, getModality, createModality, deleteModality, updateModality } from '../controllers/modalitiesController.js'

const router = express.Router()

router.get('/', recordCounter, getAllModalities)
router.get('/:id', findModalitie('find'), getModality)
router.post('/', validateModalities, handleValidationErrors, modalityExist, createModality)
router.delete('/:id', findModalitie('delete'), deleteModality)
router.put('/:id', validateModalities, handleValidationErrors, modalityExist, updateModality)

export default router
