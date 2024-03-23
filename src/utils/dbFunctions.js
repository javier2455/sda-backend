import { pool } from '../db.js'

// Not used for now
export async function insertOthersParams (
  array,
  arrayQuery,
  referenceID,
  dbValues,
  aditionalQuery
) {
  array.forEach(async (element) => {
    await pool.query(arrayQuery, [referenceID, { ...element }, [...dbValues]])
  })
  const result = await pool.query(aditionalQuery, [referenceID])
  return result.rows
}
