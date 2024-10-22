import { body } from "express-validator"

import connectionData from "../utils/db.js"

export const validateModalities = [
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('has_document')
        .isBoolean()
        .withMessage('Este campo debe ser true o false'),
    body('max_students')
        .isInt({ min: 1, max: 9 })
        .withMessage('Un estudiante es requerido como minimo')
]

export const findModalitie = (action) => async (req, res, next) => {
    const { id } = req.params
    try {
      if (action === 'find' || action === 'delete') {
        const result = await connectionData.query(
          'SELECT * FROM titling_modalities WHERE id = $1',
          [id]
        )
        if (result.rows.length === 0) {
          return res.status(404).json({ message: 'Modalidad no encontrado.' })
        }
        if (action === 'delete') {
          await connectionData.query(
            'DELETE FROM titling_modalities WHERE id = $1',
            [id]
          )
        } else {
          req.modality = result.rows[0]
        }
        next()
      }
    } catch (error) {
      throw new Error('Error al encontrar la modalidad')
    }
  }

export const modalityExist = async (req, res, next) => {
    const { name } = req.body
    try {
        const result = await connectionData.query(
            'SELECT * FROM titling_modalities WHERE name = $1',
            [name]
        )
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'La modalidad ya está registrada.'})
        }
        next()
    } catch (error) {
        throw new Error('Error al validar la modalidad')
    }
}
