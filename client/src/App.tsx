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

const App: React.FC = () => {
  const [ user, setUser ] = useState(null)
  // const [ history, setHistory ] = useState(useHistory())

  const history = useHistory()
  console.log(history)
  
  const fetchActiveUser = async () => {
    try {
      const response = await axios.get("/logged_in", { withCredentials: true })
      if (response.data.username) {
        console.log(response.data)
        updateUser(response.data.username) 
        history.push('/home-protected')
      }
    } catch (err) {
      console.log('Error', err)
    } 
  }

  const updateUser = (newUser: any) => {
    setUser(newUser)
  }

  useEffect(() => {
    fetchActiveUser()
  })
  
  return (
    <AuthContext.Provider value={{user: user , setUser: setUser}}>
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
      </Switch>
    </AuthContext.Provider>
  )
}

export default App;
