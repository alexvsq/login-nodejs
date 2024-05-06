import { createContext, useContext, useState } from "react";
import { CreateTaskRequest , getTasksRequest, deleteTaskRequest , getTaskRequest , updateTaskRequest} from '../api/tasks.js'

const taskContext = createContext()

export const useTasks = () => {
    const context = useContext(taskContext)
    if (!context) throw new Error('useTasks must be used within a TaskProvider')
    return context
}

export function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const res = await getTasksRequest()
            setTasks(res.data)
        } catch (error) {
            console.log(error);
        }
    }

    const createTask = async (task) => {
        try {
            const res = await CreateTaskRequest(task)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            setTasks(tasks.filter(task => task.id !== id))
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
         return res.status(404).json({message: "Task not found"})
        }
    }
    const updateTask = async (id, newTask) => {
        try {
            const res = await updateTaskRequest(id, newTask)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <taskContext.Provider value={{ tasks, setTasks, createTask , getTasks, deleteTask , getTask, updateTask}}>
            {children}
        </taskContext.Provider>
    )
}