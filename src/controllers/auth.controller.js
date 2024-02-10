import { AuthModel } from '../models/auth.model.js'
import { validateAuthentication } from '../schemas/auth.schema.js'
import { createAccessToken } from '../utils/jwt.js'

export class AuthController {
  static login = async (req, res) => {
    try {
      const validatedFields = validateAuthentication(req.body)

      if (validatedFields.error) {
        return res.status(400).json({
          type: 'ZOD',
          message: validatedFields.error.errors.map((err) => err.message)
        })
      }

      const userFound = await AuthModel.login({ user: validatedFields.data })
      if (userFound.error) {
        return res
          .status(404)
          .json({ message: [userFound.message] })
      }

      const token = await createAccessToken({ id: userFound.id })
      userFound.token = token
      // res.cookie('token', token)

      return res.status(200).json({
        message: 'Credenciales correctas',
        data: userFound
      })
    } catch (error) {
      res.status(500).json({ message: [error.message] })
    }
  }

  //   static logout = async (req, res) => {
  //     res.cookie('token', '', { expires: new Date(0) })
  //     return res.status(200).json({ message: [AUTH_SUCCESS.LOGOUT] })
  //   }

  //   static verifyToken = async (req, res) => {
  //     const token = req.cookies
  //     if (!token) {
  //       return res.status(401).json({ message: [AUTH_ERRORS.NOT_TOKEN] })
  //     }

  //     jwt.verify(token, TOKEN_SECRET, async (err, user) => {
  //       if (err) {
  //         return res
  //           .status(401)
  //           .json({ message: [AUTH_ERRORS.USERS_NOT_AUTHORIZED] })
  //       }

  //       const userFound = await AuthModel.login({ user: user.id })
  //       if (userFound.userfound === false) {
  //         return res.status(404).json({ message: [AUTH_ERRORS.USER_NOT_FOUND] })
  //       }

  //       return res.status(200).json({
  //         message: [AUTH_SUCCESS.CORRECTS_CREDENTIALS],
  //         data: {
  //           id: userFound._id,
  //           username: userFound.username,
  //           fullname: userFound.fullname,
  //           avatar: userFound.avatar,
  //           role: userFound.role
  //         }
  //       })
  //     })
  //   }

  //   static profile = async (req, res) => {
  //     try {
  //       const userFound = await AuthModel.profile({ id: req.user.id })
  //       if (userFound.userfound === false) {
  //         return res.status(404).json({ message: [AUTH_ERRORS.USER_NOT_FOUND] })
  //       }
  //       return res.status(200).json({
  //         message: AUTH_SUCCESS.PROFILE_INFO,
  //         data: {
  //           id: userFound._id,
  //           username: userFound.username,
  //           fullname: userFound.fullname,
  //           avatar: userFound.avatar,
  //           createdAt: userFound.createdAt,
  //           updatedAt: userFound.updatedAt
  //         }
  //       })
  //     } catch (error) {
  //       res.status(500).json({ message: error.message })
  //     }
  //   }
}
