import z from 'zod'
import {
  API_METHOD,
  API_VISIBILITY,
  API_BODY
} from '../constants/api.constants.js'

const userSchema = z.object({
  nombre: z
    .string({
      invalid_type_error: 'El campo nombre debe ser un texto',
      required_error: 'El campo nombre es requerido'
    })
    .maxLength(100),
  descripcion: z
    .string({
      invalid_type_error: 'El campo descripcion debe ser un texto',
      required_error: 'El campo descripcion es requerido'
    })
    .maxLength(100),
  _url: z
    .string({
      invalid_type_error: 'El campo url debe ser un texto',
      required_error: 'El campo url es requerido'
    })
    .maxLength(100),
  metodo: z.enum(
    [
      API_METHOD.GET,
      API_METHOD.POST,
      API_METHOD.PUT,
      API_METHOD.DELETE,
      API_METHOD.PATCH
    ],
    {
      required_error: 'El campo método es requerido'
    }
  ),
  visibilidad: z.enum([API_VISIBILITY.PRIVATE, API_VISIBILITY.PUBLIC], {
    required_error: 'El campo visibilidad es requerido'
  }),
  body: z.enum(
    [
      API_BODY.FORM,
      API_BODY.JSON,
      API_BODY.OTHER,
      API_BODY.PLAIN,
      API_BODY.XML
    ],
    {
      required_error: 'El campo body es requerido'
    }
  )
})

export function validateApi(object) {
  return userSchema.safeParse(object)
}
