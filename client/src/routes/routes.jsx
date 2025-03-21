import { Navigate } from 'react-router-dom'
import RoleBasedProtection from './RoleBasedProtection.jsx'
import {
  Registration,
  Login,
  AdminDashboard,
  UserDashboard,
} from '../pages'

const routes = [
  // authentication routes
  {
    path: '/login',
    element: <Login />,
    layout: 'blank',
  },
  {
    path: '/',
    element: <Navigate to='/login' replace />,
    layout: 'blank',
  },
  {
    path: '/Registration',
    element: <Registration />,
    layout: 'blank',
  },
  // protected routes
  {
    path: "/admin/dashboard",
    element: (
      <RoleBasedProtection allowedRoles={['Admin']}>
        <AdminDashboard />
      </RoleBasedProtection>
    )
  },
  {
    path: "/user/dashboard",
    element: (
      <RoleBasedProtection allowedRoles={['User']}>
        <UserDashboard />
      </RoleBasedProtection>
    )
  },
]

export default routes
