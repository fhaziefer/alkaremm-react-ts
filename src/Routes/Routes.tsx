import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom'

import RegisterScreen from '../Pages/RegisterScreen'
import LoginScreen from '../Pages/LoginScreen'
import HomeScreen from '../Pages/(logged-in)/HomeScreen'
import ProfileScreen from '../Pages/(logged-in)/ProfileScreen'
import AdminDashboardScreen from '../Pages/(admin)/AdminDashboardScreen'

type Props = {}

const UserRoute = () => {
  const { authenticated } = useContext(AuthContext)

  if (!authenticated) return <Navigate to='login' replace />
  return <Outlet />
}

const AdminRoute = () => {
  const { authenticated, admin } = useContext(AuthContext)

  if (!authenticated && !admin) return <Navigate to='login' replace />
  return <Outlet />
}

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route element={<UserRoute />}>
        <Route path='/' element={<HomeScreen />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<AdminDashboardScreen />} />
      </Route>
    </Router>
  )
}

export default Routes