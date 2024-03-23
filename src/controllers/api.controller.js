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
      return res.status(200).send('getById working')
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
        res.status(201).json({ message: 'Api created', data: apiCreated })
      }
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: [error.message] })
    }
  }

  static update = async (req, res) => {
    try {
      return res.status(200).send('update working')
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static delete = async (req, res) => {
    try {
      return res.status(200).send('delete working')
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
