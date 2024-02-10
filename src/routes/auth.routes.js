import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.get('/test', (req, res) => res.send('Test auth route'))
