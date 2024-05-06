import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './context/authContext'

export default function protectedRoutes() {

  const { loading, isAuntheticated } = useAuth()

  console.log(loading , isAuntheticated)

  if (loading) return <h1>Loading...</h1>

  if (!loading && !isAuntheticated) return <Navigate to="/login" replace />

  return (
    <Outlet />
  )
}
