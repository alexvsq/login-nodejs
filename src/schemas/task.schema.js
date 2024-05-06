import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string(
        { required_error: 'Title is required' }
    ).min(1, 'Title is required'),
    description: z.string({
        required_error: 'description is required'
    }),
    date: z.string().datetime().optional()
})
