import { Router } from 'express'
import { ApiController } from '../controllers/api.controller.js'
import { authRequired } from '../middlewares/validateToken.js'
import { getUserRole } from '../middlewares/getUserRole.js'
import { roleValidation } from '../middlewares/roleValidation.js'

export const apiRouter = Router()

apiRouter.get(
  '/get_all_apis',
  authRequired,
  getUserRole,
  roleValidation,
  ApiController.getAll
)
apiRouter.get(
  '/get_api/:id',
  authRequired,
  getUserRole,
  roleValidation,
  ApiController.getById
)
apiRouter.post(
  '/create_api',
  authRequired,
  getUserRole,
  roleValidation,
  ApiController.create
)
apiRouter.patch(
  '/update_api/:id',
  authRequired,
  getUserRole,
  roleValidation,
  ApiController.update
)
apiRouter.delete(
  '/delete_api/:id',
  authRequired,
  getUserRole,
  roleValidation,
  ApiController.delete
)
apiRouter.get('/test', ApiController.test)
