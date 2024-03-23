import { USER_ROLE } from '../constants/user.constants.js'

export const roleValidation = async (req, res, next) => {
  if (req.role !== USER_ROLE.ADMINISTRADOR) {
    return res.status(401).json({ message: 'Permisos insuficientes' })
  }
  next()
}
