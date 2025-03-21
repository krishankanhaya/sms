import { jwtDecode } from "jwt-decode";
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectedLayout = ({ children }) => {
  const navigate = useNavigate()
  const roles = ['Admin', 'User']
  let token = localStorage.getItem('accessToken')
  let decodedToken = ''
  if (!token) {
    navigate('/login', { replace: true })
  }
  else {
    decodedToken = jwtDecode(token)
  }

  useEffect(() => {
    if (!roles.includes(decodedToken?.role)) {
      navigate('/login', { replace: true })
    }
  }, [token])

  return (
    <>{children}</>
  )
}

export default ProtectedLayout
