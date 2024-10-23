import connectionData from "../utils/db.js"

export const getAllCommittee = async (req, res) => {
    const { total, page, totalPages, committee } = req.pagination;
    try {
        res.json({total, page, totalPages, committee})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getCommittee = async (req, res) => {
    try {
        res.json(req.committee)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createCommittee = async (req, res) => {
    const { worker_number, name, faculty, career } = req.body
    try {
        const result = await connectionData.query(
            'INSERT INTO committees (worker_number, name, faculty, career) VALUES ($1, $2, $3, $4) RETURNING *',
            [worker_number, name, faculty, career]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message})
    }
}

export const deleteCommittee = async (req, res) => {
    try {
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

export const updateCommittee = async (req, res) => {
    const { id } = req.params
    const { name, faculty, career } = req.body
    try {
        const result = await connectionData.query(
            'UPDATE committees SET name = $1, faculty = $2, career = $3 WHERE id = $4 RETURNING *',
            [name, faculty, career, id]
        )
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
