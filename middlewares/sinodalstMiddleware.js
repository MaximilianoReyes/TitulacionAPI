import { body } from 'express-validator'

import connectionData from '../utils/db.js'

import { validateCommittee, validateUpdateCommittee } from './committeeMiddleware.js'

export const validateSinodalst = [
    ...validateCommittee,
    body('role_id')
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isInt({ min: 1, max: 3 })
        .withMessage('El rol debe estar en el rango de 1 a 3')
]   

export const validateUpdateSinodalst = [
    ...validateUpdateCommittee,
    body('role_id')
        .notEmpty()
        .withMessage('El rol es obligatorio')
        .isInt({ min: 1, max: 3 })
        .withMessage('El rol debe estar en el rango de 1 a 3')
]

export const findWorkerSinodalst = (action) => async (req, res, next) => {
    const { id } = req.params
    try {
        if (action === 'find' || action === 'delete') {
            const result = await connectionData.query(
                'SELECT * FROM sinodalst WHERE id = $1',
                [id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Trabajador no encontrado' })
            }
            if (action === 'delete') {
                await connectionData.query(
                    'DELETE FROM sinodalst WHERE id = $1',
                    [id]
                )
            } else {
                req.sinodalst = result.rows[0]
            }
            next()
        }
    } catch (error) {
        throw new Error('Error al encontrar al trabajador')
    }
}

export const workerExistSinodalst = async (req, res, next) => {
    const { worker_number } = req.body
    try {
        const result = await connectionData.query(
            'SELECT * FROM sinodalst WHERE worker_number = $1',
            [worker_number]
        )
        if (result.rows.length > 0) {
            return res.status(400).json({ message: 'El trabajador ya esta registrado.' })
        }
        next( )
    } catch (error) {
        throw new Error('Error al validar al trabajador')
    }
}
