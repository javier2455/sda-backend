import { Router } from 'express'
import { AuthController } from '../controllers/auth.controller.js'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
authRouter.get('/login', (req, res) =>
  res.status(201).json({ message: 'esto fue lo que llego' })
)
