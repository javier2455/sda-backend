import { validateUser } from '../schemas/user.schema.js'
import { UserModel } from '../models/user.model.js'

export class UserController {
  static getAll = async (req, res) => {
    try {
      const allUsers = await UserModel.getAll()
      if (allUsers.error) {
        return res.status(404).json({ message: [allUsers.message] })
      }
      res.status(200).json({
        message: 'SATISFACTORY SEARCH',
        count: allUsers.length,
        data: allUsers
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static getById = async (req, res) => {
    try {
      const { id } = req.params
      const user = await UserModel.getById({ id })
      if (user.error) {
        return res.status(404).json({ message: [user.message] })
      }
      res.status(200).json({
        message: 'SATISFACTORY SEARCH',
        data: user
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static create = async (req, res) => {
    try {
      const validatedFields = validateUser(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }

      const userCreated = await UserModel.create({ user: validatedFields.data })
      if (userCreated.error) {
        res.status(430).json({ message: [userCreated.message] })
      } else {
        res.status(201).json({
          message: 'Usuario creado',
          description: 'EL usuario fue creado satisfactoriamente',
          data: userCreated
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
      const validatedFields = validateUser(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }
      const userUpdated = await UserModel.update({
        id,
        user: validatedFields.data
      })

      if (userUpdated.error) {
        return res.status(404).json({ message: [userUpdated.message] })
      } else {
        res
          .status(200)
          .json({
            message: 'Usuario editado',
            description: 'Usuario editado satisfactoriamente',
            data: userUpdated
          })
      }
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static delete = async (req, res) => {
    try {
      const { id } = req.params
      const user = await UserModel.delete({ id })
      if (user.error) {
        return res.status(404).json({ message: [user.message] })
      }
      res.status(200).json({
        message: 'Eliminación completada',
        description: 'El usuario se elimino correctamente',
        data: user
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  static test = async (req, res) => {
    try {
      const result = await UserModel.test()
      res.status(200).json({ message: result.rows[0] })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }
}
