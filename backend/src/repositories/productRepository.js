const pool = require('../config/database')

const productSelect = `
  SELECT
    p.id,
    p.nombre AS name,
    p.descripcion AS description,
    p.precio AS price,
    'USD' AS currency,
    p.imagen AS image,
    c.nombre AS category
  FROM productos p
  INNER JOIN categorias c ON p.categoria_id = c.id
`

async function findAll() {
  const [rows] = await pool.query(`
    ${productSelect}
    ORDER BY p.id
  `)

  return rows
}

async function findById(id) {
  const [rows] = await pool.query(
    `
      ${productSelect}
      WHERE p.id = ?
      LIMIT 1
    `,
    [id],
  )

  return rows[0] || null
}

module.exports = {
  findAll,
  findById,
}
