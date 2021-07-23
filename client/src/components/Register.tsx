import React, { ChangeEvent, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../AuthContext'
import '../style/style.css'

const Register: React.FC = () => {
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
      const response = await axios.post('/register', {
        username: username,
        password: password
      })
      console.log(response.data)
      setUser(response.data.username)
      setIsIncorrect(false)
      history.push('/home-protected')
    } catch (err) {
      console.log(err)
      setIsIncorrect(true)
    }
  }

  return (
    <form className="ui form login" onSubmit={e => onSubmit(e)}>
      <div className="field">
        <label>Username</label>
        <input onChange={e => onType(e, 'username')} type="text" name="username" placeholder="Username" value={username}/>
      </div>
      <div className="field">
        <label>Password</label>
        <input autoComplete="new-password" onChange={e => onType(e, 'password')} type="password" name="password" placeholder="Password" value={password} />
      {isIncorrect ? <div className="incorrect">Username already taken</div> : null}
      </div>
      <button className="ui button" type="submit" >Register</button>
    </form>
  )
}

export default Register