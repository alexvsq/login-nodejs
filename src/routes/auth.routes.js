import { Router } from "express";
import { login, register, logout, profile , verifyToken} from '../controlers/auth.controller.js'
import { authRequire } from "../middlesware/validateToken.js";
import { registerSchema, loginSchema } from '../schemas/aut.schema.js'
import { validatorSchema } from '../middlesware/validator.middleware.js'

const router = Router();

router.post('/register', validatorSchema(registerSchema), register)
router.post('/login', validatorSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)

router.get('/profile', authRequire, profile)

export default router;