import bcrypt from 'bcryptjs'
import { prisma } from '../libs/prisma.js'
import { handleErrors } from '../utils/handleErrors.js'

export class UserModel {
  static getAll = async () => {
    try {
      const allUsers = await prisma.users.findMany()
      return allUsers
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  static getById = async ({ id }) => {
    try {
      const user = await prisma.users.findFirst({
        where: {
          id: Number(id)
        }
      })
      // const user = await pool.query(USER_SCRIPTS.GET_USER_BY_ID, [id])
      if (!user) {
        return { error: true, message: 'USER NOT FOUND' }
      }
      return user
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  static create = async ({ user }) => {
    try {
      const { username, password, role, email = '' } = user
      const hashPassword = await bcrypt.hash(password, 10)

      const newUser = await prisma.users.create({
        data: {
          username,
          password: hashPassword,
          role,
          email
        }
      })

      return newUser
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  static update = async ({ id, user }) => {
    try {
      if (user.password) {
        const hashPassword = await bcrypt.hash(user.password, 10)
        user.password = hashPassword
      }
      const userUpdated = await prisma.users.update({
        where: {
          id: Number(id)
        },
        data: user
      })

      if (!userUpdated) {
        return { error: true, message: 'USER NOT FOUND' }
      }
      return userUpdated
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  static delete = async ({ id }) => {
    try {
      const userDeleted = await prisma.users.delete({
        where: {
          id: Number(id)
        }
      })
      return userDeleted
    } catch (error) {
      return handleErrors({ error })
    } finally {
      await prisma.$disconnect()
    }
  }

  // static test = async () => {
  //   return await pool.query('SELECT NOW()')
  // }

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
