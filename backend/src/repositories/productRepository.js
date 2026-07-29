const pool = require('../config/database')

const productSelect = `
  SELECT
    p.id,
    p.nombre AS name,
    p.descripcion AS description,
    p.precio AS price,
    p.moneda AS currency,
    p.imagen AS image,
    c.nombre AS category
  FROM productos p
  INNER JOIN categorias c ON p.categoria_id = c.id
`

function getWhereClause(categoryId) {
  if (categoryId) {
    return {
      clause: 'WHERE p.categoria_id = ?',
      values: [categoryId],
    }
  }

  return {
    clause: '',
    values: [],
  }
}

function getOrderClause({ sortBy, sortDirection }) {
  const columns = {
    name: 'p.nombre',
    price: 'p.precio',
  }
  const column = columns[sortBy] || 'p.id'
  const direction = sortDirection === 'desc' ? 'DESC' : 'ASC'

  return `ORDER BY ${column} ${direction}, p.id ASC`
}

async function findAll({ limit, offset, categoryId, sortBy, sortDirection }) {
  const where = getWhereClause(categoryId)
  const values = [...where.values]
  let query = `
    ${productSelect}
    ${where.clause}
    ${getOrderClause({ sortBy, sortDirection })}
  `

  if (limit) {
    query += ' LIMIT ?'
    values.push(limit)
  }

  if (offset) {
    query += ' OFFSET ?'
    values.push(offset)
  }

  const [rows] = await pool.query(query, values)

  return rows
}

async function countAll({ categoryId }) {
  const where = getWhereClause(categoryId)
  const [rows] = await pool.query(
    `
      SELECT COUNT(*) AS total
      FROM productos p
      ${where.clause}
    `,
    where.values,
  )

  return rows[0].total
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
  countAll,
  findById,
}
