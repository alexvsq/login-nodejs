import jwt from 'jsonwebtoken'
import { token_secret } from '../config.js'


export const authRequire = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: 'Unauthorized' })

    jwt.verify(token, token_secret, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' })
        req.user = decoded
        next()
    })

}