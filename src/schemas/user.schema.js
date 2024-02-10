import z from 'zod'
import { USER_ROLE } from '../constants/user.constants.js'
// import { AUTH_FIELDS } from '../constants/errors'

const userSchema = z.object({
  usuario: z.string({
    invalid_type_error: 'El campo usuario debe ser un texto',
    required_error: 'El campo usuario es requerido'
  }),
  contraseña: z.string({
    required_error: 'El campo contraseña es requerido'
  }),
  rol: z.enum([USER_ROLE.ADMINISTRADOR, USER_ROLE.USUARIO], {
    required_error: 'El campo rol es requerido'
  })
})

export function validateUser(object) {
  return userSchema.safeParse(object)
}
