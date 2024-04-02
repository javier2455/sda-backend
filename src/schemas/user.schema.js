import z from 'zod'
import { USER_ROLE } from '../constants/user.constants.js'
// import { AUTH_FIELDS } from '../constants/errors'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'El campo usuario debe ser un texto',
    required_error: 'El campo usuario es requerido'
  }),
  password: z.string({
    required_error: 'El campo contraseña es requerido'
  }),
  role: z.enum([USER_ROLE.ADMINISTRADOR, USER_ROLE.USUARIO], {
    required_error: 'El campo rol es requerido'
  }),
  email: z
    .string()
    // .regex(
    //   /^(([^<>()[]\\.,;:s@”]+(.[^<>()[]\\.,;:s@”]+)*)|(“.+”))@(([[0–9]{1,3}.[0–9]{1,3}.[0–9]{1,3}.[0–9]{1,3}])|(([a-zA-Z-0–9]+.)+[a-zA-Z]{2,}))$/
    // )
    .nullish()
})

export function validateUser(object) {
  return userSchema.safeParse(object)
}
