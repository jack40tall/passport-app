import React from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext'

import { Route, useHistory, Switch } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import UnauthorizedAccess from './components/UnauthorizedAccess';
import { useState, useEffect } from 'react';
import LogoutPage from './components/LogoutPage';
import Register from './components/Register';

const REACT_APP_LOGIN_URL = 'http://localhost:5000/login'

const App: React.FC = () => {
  const [ user, setUser ] = useState(null)
  // const [ history, setHistory ] = useState(useHistory())

  const history = useHistory()
  
  const fetchActiveUser = async () => {
    try {
      const { data } = await axios.get("/user")
      updateUser(data) 
      history.push('/home-protected')
    } catch (err) {
      console.log('Error', err)
      if (err?.response?.status === 404) {
        return window.location.replace(REACT_APP_LOGIN_URL!)
      }
    } 
  }

  const updateUser = (newUser: any) => {
    setUser(newUser)
  }

  useEffect(() => {
    console.log('in useEffect app.tsx')
    fetchActiveUser()
  }, [])
  
  return (
    <AuthContext.Provider value={{user: user , setUser: setUser}}>
      <div>{ user ? user : "No User" }</div>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <ProtectedRoute path="/home-protected">
          <Home />
        </ProtectedRoute>
        <Route path="/unauthorized">
          <UnauthorizedAccess />
        </Route>
        <Route path="/logout">
          <LogoutPage />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </AuthContext.Provider>
  )
}

export default App;
