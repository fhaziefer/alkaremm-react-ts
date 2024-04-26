import { Routes as Router, Route } from 'react-router-dom'

//* ROUTE CONFIG
import UserRoute from './UserRoute'
import AdminRoute from './AdminRoute'

//* PUBLIC ROUTE
import RegisterScreen from '../Pages/RegisterScreen'
import LoginScreen from '../Pages/LoginScreen'

//* ADMIN ROUTE
import AdminDashboardScreen from '../Pages/(admin)/AdminDashboardScreen'

//* USER LOGED-IN ROUTE
import HomeScreen from '../Pages/(logged-in)/HomeScreen'
import UserDetailScreen from '../Pages/(logged-in)/UserDetailScreen'
import UserSettingScreen from '../Pages/(logged-in)/UserSettingScreen'
import ProfileScreen from '../Pages/(logged-in)/ProfileScreen'
import SearchScreen from '../Pages/(logged-in)/SearchScreen'
import AboutScreen from '../Pages/(logged-in)/AboutScreen'

type Props = {}

const Routes = (props: Props) => {
  return (
    <Router>
      //* PUBLIC ROUTE
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />

      //* ADMIN ROUTE
      <Route element={<AdminRoute />}>
        <Route path='/admin/dashboard' element={<AdminDashboardScreen />} />
      </Route>

      //* USER LOGED-IN ROUTE
      <Route element={<UserRoute />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/search' element={<SearchScreen />} />
        <Route path='/:id' element={<UserDetailScreen />} />
        <Route path='/profile/setting' element={<UserSettingScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/about' element={<AboutScreen />} />
      </Route>
      
    </Router>
  )
}

export default Routes