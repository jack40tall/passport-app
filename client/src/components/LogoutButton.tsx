import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthContext'

const LogoutButton: React.FC = () => {
  const { user, setUser } = useContext(AuthContext)

  const logout = async () => {
    try {
      const response = await axios.get('/logout', { withCredentials: true })
      console.log('logout response', response)
      setUser(null)
      console.log(user)
    } catch (err) {
      console.log('Logout failed')
    }
  }

  return(
    <Link className="link" to="/logout">
      <button onClick={() => logout()} className="ui button logout">Log out</button>
    </Link>
  )
}

export default LogoutButton