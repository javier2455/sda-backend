import { UserModel } from '../models/user.model.js'

export const getUserRole = async (req, res, next) => {
  const userID = req.user.id
  const user = await UserModel.getById({ id: userID })
  if (user.error) {
    return res.status(404).json({ message: [user.message] })
  }
  req.role = user.role
  next()
}
