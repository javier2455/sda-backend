import { prisma } from '../libs/prisma.js'
import { handleUpdateApi } from '../utils/dbFunctions.js'
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

  static getById = async ({ id }) => {
    try {
      const apiFound = await prisma.api.findFirst({
        where: {
          id: Number(id)
        },
        include: {
          headers: true,
          params: true,
          entities: true
        }
      })
      if (!apiFound) {
        return { error: true, message: 'API NOT FOUND' }
      }
      return apiFound
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

  static update = async ({ id, api }) => {
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

      const apiUpdated = await prisma.api.update({
        where: {
          id: Number(id)
        },
        data: {
          name,
          description,
          url,
          method,
          visibility,
          body
        }
      })

      if (headers) {
        handleUpdateApi(headers, apiUpdated.id, 'api_headers')
        // const existsHeaders = await prisma.api_headers.findMany({
        //   where: {
        //     apiId: apiUpdated.id
        //   }
        // })
        // if (existsHeaders.length !== 0) {
        //   await prisma.api_headers.updateMany({
        //     where: {
        //       apiId: apiUpdated.id
        //     },
        //     data: [...headers]
        //   })
        // } else {
        //   const updatedHeaders = headers.map((header) => {
        //     header.apiId = apiUpdated.id
        //     return header
        //   })
        //   await prisma.api_headers.createMany({
        //     data: [...updatedHeaders]
        //   })
        // }
      }
      if (params) {
        handleUpdateApi(params, apiUpdated.id, 'api_params')
      }
      if (entities) {
        handleUpdateApi(entities, apiUpdated.id, 'api_entity')
      }
      return apiUpdated
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  static delete = async ({ id }) => {
    try {
      const apiDeleted = await prisma.api.delete({
        where: {
          id: Number(id)
        }
      })
      if (!apiDeleted) {
        return { error: true, message: 'API NOT FOUND' }
      }
      return apiDeleted
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }
}
