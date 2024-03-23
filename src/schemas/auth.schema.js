import z from 'zod'
// import { AUTH_FIELDS } from '../constants/errors'

const authSchema = z.object({
  username: z.string({
    invalid_type_error: 'El campo usuario debe ser un texto',
    required_error: 'El campo usuario es requerido'
  }),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  })
})

export function validateAuthentication(object) {
  return authSchema.safeParse(object)
}
