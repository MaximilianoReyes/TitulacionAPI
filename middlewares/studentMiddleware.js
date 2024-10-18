import { body } from "express-validator"

import connectionData from "../utils/db.js" 

export const validateStudent = [
    body('account_number')
      .isLength({ min: 8, max: 8 })
      .withMessage('El número de cuenta debe tener excatamente 8 caracteres'),
    body('name')
      .notEmpty()
      .withMessage('El nombre es obligatorio'),
    body('generation')
      .isLength({ min: 4, max: 4 })
      .withMessage('La generación debe hacerse con 4 caracteres'),
    body('career')
      .notEmpty()
      .withMessage('La carrera es obligatoria'),
    body('faculty')
      .notEmpty()
      .withMessage('La facultad es obligatoria'),
]

export const validateUpdateStudent = [
    ...validateStudent.slice(1)
]

export const findStudent = (action) => async (req, res, next) => {
  const { id } = req.params
  try {
    if (action === 'find' || action === 'delete') {
      const result = await connectionData.query(
        'SELECT * FROM students_v2 WHERE id = $1',
        [id]
      )
      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Estudiante no encontrado.' })
      }
      if (action === 'delete') {
        await connectionData.query(
          'DELETE FROM students_v2 WHERE id = $1',
          [id]
        )
      } else {
        req.student = result.rows[0]
      }
      next()
    }
  } catch (error) {
    throw new Error('Error al encontrar el estudiante')
  }
}

export const studentExist = async (req, res, next) => {
    const { account_number } = req.body
    try {
        const result = await connectionData.query(
            'SELECT * FROM students_v2 WHERE account_number = $1',
            [account_number]
        )
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'El estudiante ya está registrado.' })
        }
        next()
    } catch (error) {
        throw new Error('Error al validar el estudiante')
    }
}
