import { prisma } from '../libs/prisma.js'
import { handleErrors } from '../utils/handleErrors.js'

export class ApiModel {
  static getAll = async () => {
    try {
      const apis = await prisma.api.findMany({
        include: {
          headers: true,
          params: true,
          entities: true
        }
      })
      return apis
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  static create = async ({ api }) => {
    try {
      const {
        name,
        description,
        url,
        method,
        visibility,
        body,
        headers,
        params,
        entities
      } = api

      const newApi = await prisma.api.create({
        data: {
          name,
          description,
          url,
          method,
          visibility,
          body
        }
      })

      if (headers && newApi.id) {
        const updatedHeaders = headers.map((header) => {
          header.apiId = newApi.id
          return header
        })
        await prisma.api_headers.createMany({
          data: [...updatedHeaders],
          skipDuplicates: true
        })
      }

      if (params && newApi.id) {
        const updatedParams = params.map((parameter) => {
          parameter.apiId = newApi.id
          return parameter
        })
        await prisma.api_params.createMany({
          data: [...updatedParams],
          skipDuplicates: true
        })
      }

      if (entities && newApi.id) {
        const updatedEntities = entities.map((entity) => {
          entity.apiId = newApi.id
          return entity
        })
        await prisma.api_entity.createMany({
          data: [...updatedEntities],
          skipDuplicates: true
        })
      }

      return newApi
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }
}
