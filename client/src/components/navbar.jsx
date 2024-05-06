import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'

export default function navbar() {

  const { isAuntheticated , logOut } = useAuth()

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">

      <Link to="/">
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>

      <ul className="flex gap-x-2">
        {
          isAuntheticated ?
          <div>
            <li>
              <Link to="/add-task">Add Tasks</Link>
            </li>
            <li>
              <Link to="/" onClick={()=> logOut()} className='text-red-700'>Logout</Link>
            </li>
          </div>
          :
          <div>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>

          </li>
        </div>
        }
      
      </ul>
    </nav>
  )
}
