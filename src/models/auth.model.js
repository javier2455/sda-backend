import bcrypt from 'bcryptjs'
import { prisma } from '../libs/prisma.js'

export class AuthModel {
  static login = async ({ user }) => {
    try {
      const { username, password } = user

      const userFound = await prisma.users.findFirst({
        where: {
          username
        }
      })
      if (!userFound) {
        return {
          error: true,
          message: 'Usuario no encontrado'
        }
      }

      // Only use if the database is empty for test, after comment
      // let correctPassword = false
      // if (contraseña === userFound.rows[0].contrasenna) {
      //   correctPassword = true
      // }

      const correctPassword = await bcrypt.compare(
        password,
        userFound.password
      )
      if (!correctPassword) {
        return {
          error: true,
          message: 'Contraseña incorrecta'
        }
      }

      return userFound
    } catch (error) {
      return { error: true, message: error.message }
    } finally {
      await prisma.$disconnect()
    }
  }

  //   static profile = async ({ id }) => {
  //     const userFound = await User.findById(id)
  //     if (!userFound) {
  //       return { userfound: false }
  //     }
  //     return userFound
  //   }
}
