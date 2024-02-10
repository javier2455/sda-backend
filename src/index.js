import express, { json } from 'express'
import cors from 'cors'
import 'dotenv/config'
import morgan from 'morgan'
import { userRouter } from './routes/user.routes.js'
import { authRouter } from './routes/auth.routes.js'

const app = express()

app.use(
  cors({
    origin: '*', // servidor que deseas que consuma o (*) en caso que sea acceso libre
    credentials: true
  })
)

app.disable('x-powered-by')

app.use(json())
app.use(morgan('dev'))

// Router
app.use('/user', userRouter)
app.use('/auth', authRouter)

const PORT = process.env.APP_PORT ?? 4010

app.listen(PORT, () =>
  console.log(`server listen on port http://localhost:${PORT}`)
)
