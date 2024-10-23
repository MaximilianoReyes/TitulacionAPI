import connectionData from "../utils/db.js"

export const getAllStudents = async (req, res) => {
    const { total, page, totalPages, students } = req.pagination;
    try {
        res.json({total, page, totalPages, students})
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const getStudent = async (req, res) => {
    try {
        res.json(req.student)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const createStudent = async (req, res) => {
    const { account_number, name, generation, career, faculty } = req.body
    try {
        const result = await connectionData.query(
            'INSERT INTO students_v2 (account_number, name, generation, career, faculty) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [account_number, name, generation, career, faculty]
        )
        res.status(201).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const deleteStudent = async (req, res) => {
    try {
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateStudent = async (req, res) => {
    const { id } = req.params
    const { name, generation, career, faculty } = req.body
    try {
        const result = await connectionData.query(
            'UPDATE students_v2 SET name = $1, generation = $2, career = $3, faculty = $4 WHERE id = $5 RETURNING *',
            [name, generation, career, faculty, id]
        )
        res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
