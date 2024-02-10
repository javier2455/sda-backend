const GET_ALL_USER = 'SELECT * FROM usuarios'
const GET_USER_BY_ID = 'SELECT * FROM usuarios WHERE id = $1'
const GET_USER_BY_USERNAME = 'SELECT * FROM usuarios WHERE usuario = $1'
const CREATE_USER =
  'INSERT INTO usuarios (usuario, contrasenna, rol, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *'
const UPDATE_USER =
  'UPDATE usuarios SET usuario = $1, contrasenna= $2, rol = $3, updated_at = $5 WHERE id = $4 RETURNING *'
const DELETE_USER = 'DELETE FROM usuarios WHERE id = $1'

export const USER_SCRIPTS = {
  GET_ALL_USER,
  GET_USER_BY_ID,
  GET_USER_BY_USERNAME,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
}
