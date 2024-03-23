import { prisma } from '../libs/prisma.js'

export async function handleUpdateApi (array, id, tableName) {
  if (tableName === 'api_headers') {
    const exitsData = await prisma.api_headers.findMany({
      where: {
        apiId: id
      }
    })
    if (exitsData.length === 0) {
      const updatedHeaders = array.map((header) => {
        header.apiId = id
        return header
      })
      await prisma.api_headers.createMany({
        data: [...updatedHeaders]
      })
    } else {
      await prisma.api_headers.deleteMany({
        where: {
          apiId: id
        }
      })
      const updatedHeaders = array.map((header) => {
        header.apiId = id
        return header
      })
      await prisma.api_headers.createMany({
        data: [...updatedHeaders]
      })
    }
  } else if (tableName === 'api_params') {
    const exitsData = await prisma.api_params.findMany({
      where: {
        apiId: id
      }
    })
    if (exitsData.length === 0) {
      const updatedParams = array.map((header) => {
        header.apiId = id
        return header
      })
      await prisma.api_params.createMany({
        data: [...updatedParams]
      })
    } else {
      await prisma.api_params.deleteMany({
        where: {
          apiId: id
        }
      })
      const updatedParams = array.map((header) => {
        header.apiId = id
        return header
      })
      await prisma.api_params.createMany({
        data: [...updatedParams]
      })
    }
  } else {
    const exitsData = await prisma.api_entity.findMany({
      where: {
        apiId: id
      }
    })
    if (exitsData.length === 0) {
      const updatedEntities = array.map((header) => {
        header.apiId = id
        return header
      })
      await prisma.api_entity.createMany({
        data: [...updatedEntities]
      })
    } else {
      await prisma.api_entity.deleteMany({
        where: {
          apiId: id
        }
      })
      const updatedEntities = array.map((header) => {
        header.apiId = id
        return header
      })
      await prisma.api_entity.createMany({
        data: [...updatedEntities]
      })
    }
  }
}
