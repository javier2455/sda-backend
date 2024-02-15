// import { validateApi } from '../schemas/api.schema.js'
// import { UserModel } from '../models/user.model.js'

export class ApiController {
  static getAll = async (req, res) => {
    try {
      return res.status(200).send('getAll working')
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
      return res.status(200).send('create working')
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
