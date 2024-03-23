const GET_ALL_APIS = 'SELECT * FROM api'
const GET_API_BY_ID = 'SELECT * FROM api WHERE id = $1'

const GET_API_HEADERS = 'SELECT * FROM api_cabeceras WHERE api_id = $1'

const GET_API_PARAMS = 'SELECT * FROM api_parametros WHERE api_id = $1'

const GET_API_ENTITIES = 'SELECT * FROM api_entidad WHERE api_id = $1'

const CREATE_API =
  'INSERT INTO api (nombre, descripcion, _url, metodo, visibilidad, body, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
const UPDATE_API =
  'UPDATE api SET usuario = $1, contrasenna= $2, rol = $3, updated_at = $5 WHERE id = $4 RETURNING *'
const DELETE_API = 'DELETE FROM api WHERE id = $1'

const GET_API_HEADERS_BY_API_ID =
  'SELECT * FROM api_cabeceras WHERE api_id = $1'
const GET_API_PARAMETERS_BY_API_ID =
  'SELECT * FROM api_parametros WHERE api_id = $1'
const GET_API_ENTITIES_BY_API_ID = 'SELECT * FROM api_entidad WHERE api_id = $1'

const CREATE_API_HEADERS =
  'INSERT INTO api_cabeceras (api_id, clave, valor, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *'
const CREATE_API_PARAMETERS =
  'INSERT INTO api_parametros (api_id, nombre, descripcion, tipo_dato, param_ejemplo, entrada_salida, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'
const CREATE_API_ENTITIES =
  'INSERT INTO api_entidad (api_id, nombre, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *'

export const API_SCRIPTS = {
  GET_ALL_APIS,
  GET_API_BY_ID,
  GET_API_HEADERS,
  GET_API_PARAMS,
  GET_API_ENTITIES,
  CREATE_API,
  UPDATE_API,
  DELETE_API,
  GET_API_HEADERS_BY_API_ID,
  GET_API_PARAMETERS_BY_API_ID,
  GET_API_ENTITIES_BY_API_ID,
  CREATE_API_HEADERS,
  CREATE_API_PARAMETERS,
  CREATE_API_ENTITIES
}
