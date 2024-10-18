import { body } from "express-validator"

import connectionData from "../utils/db.js"

export const validateCommittee = [
    body('worker_number')
        .isLength({ min: 4, max: 4 })
        .withMessage('El numero de trabajador tiene que tener minimo 4 caracteres'),
    body('name')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('faculty')
        .notEmpty()
        .withMessage('La facultad es obligatioria'),
    body('career')
        .notEmpty()
        .withMessage('La carrera es obligatoria')
]

export const validateUpdateCommittee = [
    ...validateCommittee.slice(1)
]

export const findWorker = (action) => async (req, res, next) => {
    const { id } = req.params
    try {
        if (action === 'find' || action === 'delete') {
            const result = await connectionData.query(
                'SELECT * FROM committees WHERE id = $1',
                [id]
            )
            if (result.rows.length === 0) {
                return res.status(404).json({ message: 'Trabajador no encontrado' })
            }
            if (action === 'delete') {
                await connectionData.query(
                    'DELETE FROM committees WHERE id = $1',
                    [id]
                )
            } else {
                req.committee = result.rows[0]
            }
            next()
        }
    } catch (error) {
        throw new Error('Error al encontrar al trabajador')
    }
}

export const workerExist = async (req, res, next) => {
    const { worker_number } = req.body
    try {
        const result = await connectionData.query(
            'SELECT * FROM committees WHERE worker_number = $1',
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
