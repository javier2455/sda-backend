import { validateApi } from '../schemas/api.schema.js'
import { ApiModel } from '../models/api.model.js'

export class ApiController {
  static getAll = async (req, res) => {
    try {
      const allAPIs = await ApiModel.getAll()
      if (allAPIs.error) {
        return res.status(404).json({ message: [allAPIs.message] })
      }
      res.status(200).json({
        message: 'SATISFACTORY SEARCH',
        count: allAPIs.length,
        data: allAPIs
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static getById = async (req, res) => {
    try {
      const { id } = req.params
      const apiFound = await ApiModel.getById({ id })
      if (apiFound.error) {
        return res.status(404).json({ message: [apiFound.message] })
      }
      res.status(200).json({
        message: 'SATISFACTORY SEARCH',
        data: apiFound
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static create = async (req, res) => {
    try {
      const validatedFields = validateApi(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }
      const apiCreated = await ApiModel.create({ api: validatedFields.data })
      if (apiCreated.error) {
        res.status(430).json({ message: [apiCreated.message] })
      } else {
        res.status(201).json({
          message: 'API creada',
          description: 'La API fue creada satisfactoriamente',
          data: apiCreated
        })
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: [error.message] })
    }
  }

  static update = async (req, res) => {
    try {
      const { id } = req.params
      const validatedFields = validateApi(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }
      const apiUpdated = await ApiModel.update({
        id,
        api: validatedFields.data
      })

      if (apiUpdated.error) {
        return res.status(404).json({ message: [apiUpdated.message] })
      } else {
        res
          .status(200)
          .json({
            message: 'API actualizada',
            description: 'La API fue actualizada satisfactoriamente',
            data: apiUpdated
          })
      }
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static delete = async (req, res) => {
    try {
      const { id } = req.params
      const apiDeleted = await ApiModel.delete({ id })
      if (apiDeleted.error) {
        return res.status(404).json({ message: [apiDeleted.message] })
      }
      res.status(200).json({
        message: 'Eliminación completada',
        description: 'La API se elimino correctamente',
        data: apiDeleted
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static test = async (req, res) => {
    try {
      return res.status(200).send('test working')
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }
}
