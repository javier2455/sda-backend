import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  const { token } = req.params
  if (!token) {
    return res.status(401).json({ message: 'Sin token, autorización denegada' })
  }
  jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, info) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalido' })
    }
    req.user = info
    next()
  })
}
