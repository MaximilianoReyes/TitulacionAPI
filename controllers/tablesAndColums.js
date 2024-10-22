import connectionData from "../utils/db.js"

export const getTablesAndColumns = async (req, res) => {
    try {
      const result = await connectionData.query(`
        SELECT table_name, column_name
        FROM information_schema.columns
        WHERE table_schema = 'public'
        ORDER BY table_name, ordinal_position;
      `)
      const tables = {}
      result.rows.forEach(row => {
        const { table_name, column_name } = row
        if (!tables[table_name]) {
          tables[table_name] = []
        }
        tables[table_name].push(column_name)
      })
      res.json(tables)
    } catch (error) {
      console.error('Error al obtener tablas y columnas:', error)
      res.status(500).json({ error: 'Error del servidor' })
    }
}
