import connectionData from "../utils/db.js"

export const getAllSinodalst = async (req, res) => {
    const { total, page, totalPages, sinodalst } = req.pagination;
    try {
        res.json({total, page, totalPages, sinodalst})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getSinodalst = async (req, res) => {
    try {
        res.json(req.sinodalst)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createSinodalst = async (req, res) => {
    const { worker_number, name, faculty, career, role_id } = req.body 
    try {
        const result = await connectionData.query(
            'INSERT INTO sinodalst (worker_number, name, faculty, career, role_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [worker_number, name, faculty, career, role_id]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteSinodalst = async (req, res) => {
    try {
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateSinodalst = async (req, res) => {
    const { id } = req.params
    const { name, faculty, career, role_id } = req.body
    try {
        const result = await connectionData.query(
            'UPDATE sinodalst SET name = $1, faculty = $2, career = $3, role_id = $4 WHERE id = $5 RETURNING *',
            [name, faculty, career, role_id, id]
        )
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
