import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import { USER_SCRIPTS } from '../scripts/user.scripts.js'

export class AuthModel {
  static login = async ({ user }) => {
    try {
      const { usuario, contraseña } = user

      const userFound = await pool.query(USER_SCRIPTS.GET_USER_BY_USERNAME, [
        usuario
      ])
      if (userFound.rowCount === 0) {
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
        contraseña,
        userFound.rows[0].contrasenna
      )
      if (!correctPassword) {
        return {
          error: true,
          message: 'Contraseña incorrecta'
        }
      }

      return userFound.rows[0]
    } catch (error) {
      return { error: true, message: error.message }
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
