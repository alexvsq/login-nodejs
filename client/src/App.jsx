import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AuthProvider } from './context/authContext.jsx'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import TasksPage from './pages/tasksPage.jsx'
import TaskFormPage from './pages/taskFormPage.jsx'
import ProtectedRoutes from './protectedRoutes.jsx'
import { TaskProvider } from './context/taskContext.jsx'
import Navbar  from './components/navbar.jsx'

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route path='/' element={<h1>Home</h1>} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />

            <Route element={<ProtectedRoutes />}>
              <Route path='/tasks' element={<TasksPage />} />
              <Route path='/add-task' element={<TaskFormPage />} />
              <Route path='/tasks/:id' element={<TaskFormPage />} />
              <Route path='/profile' element={<h1>profile</h1>} />
            </Route>
          </Routes>
        </BrowserRouter>

      </TaskProvider>
    </AuthProvider>
  )
}
