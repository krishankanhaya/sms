import { useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { UserDashboard } from '../pages'

const RoleBasedProtection = ({ allowedRoles, children }) => {
  const navigate = useNavigate()
  let token = localStorage.getItem('accessToken')
  let role = ''
  if (!token) {
    navigate('/login', { replace: true })

  } else {
    const decodedToken = jwtDecode(token)
    role = decodedToken.role
  }
  useEffect(() => {
    if (!allowedRoles.includes(role)) navigate('/login', { replace: true })
  }, [role, allowedRoles])

  return (role === 'Admin') ? <>{children}</> : (role === 'User') ? <UserDashboard>{children}</UserDashboard> : <Navigate to={'/login'} replace />

}

export default RoleBasedProtection
