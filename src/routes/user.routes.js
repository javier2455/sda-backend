import { Router } from 'express'
import { UserController } from '../controllers/user.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { getUserRole } from '../middlewares/getUserRole.js'
import { roleValidation } from '../middlewares/roleValidation.js'

export const userRouter = Router()

userRouter.get(
  '/get_all_users',
  authRequired,
  getUserRole,
  roleValidation,
  UserController.getAll
)
userRouter.get(
  '/get_user/:id',
  authRequired,
  getUserRole,
  roleValidation,
  UserController.getById
)
userRouter.post(
  '/create_user',
  authRequired,
  getUserRole,
  roleValidation,
  UserController.create
)
userRouter.patch(
  '/update_user/:id',
  authRequired,
  getUserRole,
  roleValidation,
  UserController.update
)
userRouter.delete(
  '/delete_user/:id',
  authRequired,
  getUserRole,
  roleValidation,
  UserController.delete
)
userRouter.get('/test', UserController.test)
