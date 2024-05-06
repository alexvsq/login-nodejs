import {Router} from 'express'
import { authRequire } from '../middlesware/validateToken.js'
import { createTask,getTask, getTasks, updateTask, deleteTask } from '../controlers/task.controller.js'
import { createTaskSchema } from '../schemas/task.schema.js'
import { validatorSchema } from '../middlesware/validator.middleware.js'

const router = Router()

router.get('/tasks', authRequire , getTasks)
router.get('/tasks/:id', authRequire , getTask)
router.post('/tasks', authRequire ,validatorSchema(createTaskSchema), createTask)
router.delete('/tasks/:id', authRequire , deleteTask)
router.put('/tasks/:id', authRequire , updateTask)

export default router