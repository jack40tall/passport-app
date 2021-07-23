import React, { ReactElement } from 'react'
import { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

interface ProtectedRouteProps {
  path: string,
  children: ReactElement<any, any>
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const { path, children } = props
  const { user } = useContext(AuthContext)

  return (
    <Route path={path}>
      {user ? children : <Redirect to="/unauthorized" /> }
    </Route>
  )
}

export default ProtectedRoute