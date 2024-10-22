import connectionData from "../utils/db.js"

export const getAllModalities = async (req, res) => {
    try {
        const result = await connectionData.query('SELECT * FROM titling_modalities')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getModality = async (req, res) => {
    try {
        res.json(req.modality)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createModality = async (req, res) => {
    const { name, has_document, max_students } = req.body
    try {
        const result = await connectionData.query(
            'INSERT INTO titling_modalities (name, has_document, max_students) VALUES ($1, $2, $3) RETURNING *',
            [name, has_document, max_students]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteModality = async (req, res) => {
    try {
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateModality = async (req, res) => {
    const { id } = req.params
    const { name, has_document, max_students } = req.body
    try {
        const result = await connectionData.query(
            'UPDATE titling_modalities SET name = $1, has_document = $2, max_students = $3 WHERE id = $4 RETURNING *',
            [name, has_document, max_students, id]
        )
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
