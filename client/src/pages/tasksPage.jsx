import { useEffect } from 'react'
import { useAuth } from '../context/authContext'
import { useTasks } from '../context/taskContext'
import { Link, useNavigate } from 'react-router-dom'

export default function tasksPage() {

  const { getTasks, tasks, deleteTask } = useTasks()
  const navigate = useNavigate()

  useEffect(() => {
    getTasks()
  }, [])


  return (
    <div>
      <p>tasksPage</p>

      {
        tasks.map(task => (
          <article key={task._id}
            className='bg-zinc-800 max-w-md p-10 rounded-md m-2 '
          >
            <div >{task.title}</div>
            <p>{task.description}</p>
            <div className='flex  justify-around'>
              <p>{new Date(task.date).toLocaleDateString()}</p>
              <button
                className='bg-indigo-500 px-2 py-1 rounded-md'>
                <Link to={`/tasks/${task._id}`}>
                  Edit
                </Link></button>
              <button
                className='bg-red-500 px-2 py-1 rounded-md'
                onClick={() => deleteTask(task._id)}
              >Delete</button>
            </div>

          </article>
        ))
      }

    </div>
  )
}
