import { Routes as Router, Route } from 'react-router-dom'

import UserRoute from './UserRoute'
import AdminRoute from './AdminRoute'

import RegisterScreen from '../Pages/RegisterScreen'
import LoginScreen from '../Pages/LoginScreen'
import HomeScreen from '../Pages/(logged-in)/HomeScreen'
import ProfileScreen from '../Pages/(logged-in)/ProfileScreen'
import AdminDashboardScreen from '../Pages/(admin)/AdminDashboardScreen'


type Props = {}

const Routes = (props: Props) => {
  return (
    <Router>
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route element={<UserRoute />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<AdminDashboardScreen />} />
      </Route>
    </Router>
  )
}

export default Routes