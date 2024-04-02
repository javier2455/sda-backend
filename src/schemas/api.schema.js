import z from 'zod'
import {
  API_METHOD,
  API_VISIBILITY,
  API_BODY
} from '../constants/api.constants.js'

const apiSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'El campo nombre debe ser un texto',
      required_error: 'El campo nombre es requerido'
    })
    .max(100),
  description: z
    .string({
      invalid_type_error: 'El campo descripcion debe ser un texto',
      required_error: 'El campo descripcion es requerido'
    })
    .max(100),
  url: z
    .string({
      invalid_type_error: 'El campo url debe ser un texto',
      required_error: 'El campo url es requerido'
    })
    .max(100),
  method: z.enum(
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
  visibility: z.enum([API_VISIBILITY.PRIVATE, API_VISIBILITY.PUBLIC], {
    required_error: 'El campo visibilidad es requerido'
  }),
  body: z
    .enum(
      [
        API_BODY.FORM,
        API_BODY.JSON,
        API_BODY.OTHER,
        API_BODY.PLAIN,
        API_BODY.XML
      ]
    )
    .nullish(),
  headers: z
    .array(
      z.object({
        key: z.string(),
        value: z.string()
      })
    )
    .nullish(),
  params: z
    .array(
      z.object({
        name: z.string(),
        description: z.string(),
        dataType: z.string(),
        example: z.string(),
        inputOrOutput: z.number().int().min(1).max(2)
      })
    )
    .nullish(),
  entities: z.array(z.object({
    name: z.string()
  })).nullish()
})

export function validateApi(object) {
  return apiSchema.safeParse(object)
}
