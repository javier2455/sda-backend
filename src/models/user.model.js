import bcrypt from 'bcryptjs'
import { pool } from '../db.js'
import { USER_SCRIPTS } from '../scripts/user.scripts.js'

export class UserModel {
  static getAll = async () => {
    try {
      const users = await pool.query(USER_SCRIPTS.GET_ALL_USER)
      return users.rows
    } catch (error) {
      // console.log(error.message)
      return { error: true, message: error.message }
    }
  }

  static getById = async ({ id }) => {
    try {
      const user = await pool.query(USER_SCRIPTS.GET_USER_BY_ID, [id])
      if (user.rowCount === 0) {
        return { error: true, message: 'USER NOT FOUND' }
      }
      return user.rows[0]
    } catch (error) {
      console.log(error.message)
      return { error: true, message: error.message }
    }
  }

  static create = async ({ user }) => {
    try {
      const { usuario, contraseña, rol } = user
      const hashPassword = await bcrypt.hash(contraseña, 10)

      const userCreated = await pool.query(USER_SCRIPTS.CREATE_USER, [
        usuario,
        hashPassword,
        rol,
        [new Date(new Date().toISOString())],
        [new Date(new Date().toISOString())]
      ])

      return userCreated.rows[0]
    } catch (error) {
      console.log(error.message)
      return { error: true, message: error.message }
    }
  }

  static update = async ({ id, user }) => {
    try {
      const { usuario, contraseña, rol } = user
      const hashPassword = await bcrypt.hash(contraseña, 10)
      const userUpdated = await pool.query(USER_SCRIPTS.UPDATE_USER, [
        usuario,
        hashPassword,
        rol,
        id,
        new Date().toISOString()
      ])
      if (userUpdated.rowCount === 0) {
        return { error: true, message: 'USER NOT FOUND' }
      }
      return userUpdated.rows[0]
    } catch (error) {
      console.log(error.message)
      return { error: true, message: error.message }
    }
  }

  static delete = async ({ id }) => {
    try {
      const userDeleted = await pool.query(USER_SCRIPTS.DELETE_USER, [id])
      if (userDeleted.rowCount === 0) {
        return { error: true, message: 'USER NOT FOUND' }
      }
      return userDeleted
    } catch (error) {
      console.log(error.message)
      return { error: true, message: error.message }
    }
  }

  static test = async () => {
    return await pool.query('SELECT NOW()')
    // return await pool.query('SELECT CURRENT_DATE')
  }

  // static getByUsername = async ({ username }) => {
  //   try {
  //     const user = await pool.query(USER_SCRIPTS.GET_USER_BY_USERNAME, [username])
  //     if (user.rowCount === 0) {
  //       return { error: true, message: 'USER NOT FOUND' }
  //     }
  //     return user.rows[0]
  //   } catch (error) {
  //     console.log(error.message)
  //     return { error: true, message: error.message }
  //   }
  // }
}
