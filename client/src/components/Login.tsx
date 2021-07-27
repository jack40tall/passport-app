import React, { ChangeEvent, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../AuthContext'
import '../style/style.css'

const Login: React.FC = () => {
  const { setUser } = useContext(AuthContext)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isIncorrect, setIsIncorrect] = useState(false)
  
  const onType = (e: ChangeEvent<HTMLInputElement>, variable: string) => {
    if(variable === 'username') {
      setUsername(e.target.value)
    } else {
      setPassword(e.target.value)


    }
  }
  
  const history = useHistory()
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const response = await axios.get('/login')
      console.log(response)
      setUser(response.data.username)
      setIsIncorrect(false)
      history.push('/home-protected')
    } catch (err) {
      setIsIncorrect(true)
    }
  }

  return (
    <form className="ui form login" onSubmit={e => onSubmit(e)}>
      <button className="ui button" type="submit" >Attempt Login</button>
    </form>
  )
}

export default Login