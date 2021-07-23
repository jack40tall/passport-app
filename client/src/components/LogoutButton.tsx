import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const LogoutButton: React.FC = () => {

  const logout = async () => {
    const response = await axios.get('/logout', { withCredentials: true })
    console.log(response)
  }

  return(
    <Link className="link" to="/logout">
      <button onClick={() => logout()} className="ui button logout">Log out</button>
    </Link>
  )
}

export default LogoutButton