import express from 'express'

import { validateStudent, validateUpdateStudent, recordCounter, findStudent, studentExist } from '../middlewares/studentMiddleware.js'
import { handleValidationErrors } from '../middlewares/validation.js'

import { getAllStudents, getStudent, createStudent, deleteStudent, updateStudent } from '../controllers/studentController.js'

const router = express.Router()

router.get('/', recordCounter, getAllStudents)
router.get('/:id', findStudent('find'), getStudent)
router.post('/', validateStudent, handleValidationErrors, studentExist, createStudent)
router.delete('/:id', findStudent('delete'), deleteStudent)
router.put('/:id', validateUpdateStudent, handleValidationErrors, findStudent('find'), updateStudent)

export default router
